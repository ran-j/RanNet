
const { validationResult } = require('express-validator/check');

const user = require("../../models/users")
const UploadModel = require("../../models/filesUploads")
const FlowMT = require("../../models/flowMeter")

var path = require('path');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var socket = require("../../SocketsApi/SocketApi")
var bcrypt = require('bcrypt');

var home = path.join(process.cwd(), '/home');
const DownloadFolder = path.join(home, '/files');

/**
 * Render home page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const index = (req, res, next) => {
    ChangeEfect('home', res)
    res.render("RanNet/index")
}

/**
 * Get User list
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const userList = (req, res, next) => {
    user.find({}).lean().exec((err, users) => {
        res.render("RanNet/users", {users})
    })
}

/**
 * Create user
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const createUser = (req, res, next) => {

    bcrypt.hash("1234", 10,(err, hash) => {
        if (err) {
            return next(err);
        }
        new user({
            matricula : req.body.login,
            name : req.body.name,
            password : hash
        }).save().then(() => res.end("success")).catch((err) => {
            console.log(err)
            res.end(err.code == 11000 ? "Login já em uso" : "Erro ao criar usuário")
        })
    })
     
}

/**
 * Reset user pwd
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const resetUser = (req, res, next) => {
    bcrypt.hash("1234", 10,(err, hash) => {
        if (err) {
            console.log(err)
            return res.end("Erro ao realizar reset")
        }
        user.changepwd(req.body.id, hash, (err) => {
            if(err) return res.end("Erro ao realizar reset")
            res.end("Realizado com sucesso")
        })
    })
}

/**
 * Delete user
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const deleteUser = (req, res, next) => {
    user.findByIdAndRemove(req.body.id).exec((err, data) => {
        if(err) return res.end("Erro ao apagar arquivo")
        res.end("Realizado com sucesso")
    })
}

/**
 * Change pwd
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const changePwd = (req, res, next) => {
    res.render("RanNet/pwd")
}

/**
 * Change pwd post
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const changePwdPost = (req, res, next) => {
    user.authenticate(req.session.matricula, req.body.pwdAtual, (error, usr) => {
        if (error || !usr) {
            res.end("Senha informada incorreta")
        } else {
            bcrypt.hash(req.body.pwd, 10,(err, hash) => {
                if (err) {
                    console.log(err)
                    return res.end("Erro ao realizar troca de senha")
                }
                user.changepwd(usr._id, hash, (err) => {
                    if(err) return res.end("Erro ao trocar senha")
                    res.end("Realizado com sucesso")
                })
            })
        }
    })
}

/**
 * Render upload Page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const uploadPage = (req, res, next) => {
    ChangeEfect('uploads', res)
    res.render("RanNet/uploads")
}

/**
 * Render downloads Page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const downloadPage = (req, res, next) => {
    ChangeEfect('downloads', res)

    UploadModel.find(req.session.admin ? {'status': 'Ativo'} : { 'status': 'Ativo', creat_by : req.session.userId }).populate("creat_by").lean().exec((err, data) => {
        res.render('RanNet/donwload', { donwloadslist: data });
        // res.json(data)
    })
}

/**
 * Download file
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const downloadFile = (req, res, next) => {
    let filePath = path.join(DownloadFolder, '/' + req.params.filename);
    console.log("Solicitado baixar "+ filePath +" as "+ new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            console.error(err)
            return res.render('Erro/pageerro', { title: 'erro 404', msg1: 'O arquivo solicitado não existe', msg2: 'Favor contatar o administrador do sistema.' });
        }

        res.download(filePath)
        //file exists
    })
}

/**
 * Delete file
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns Any
 */
const deleteFile = (req, res, next) => {
    let filePath = path.join(DownloadFolder, '/' + req.params.filename);
    console.log("Solicitado apagar arquivo "+ filePath +" as "+ new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            console.error(err)
            return err.syscall == "access" ? res.render('Erro/pageerro', { title: 'erro 500', msg1: 'Erro ao apagar o arquivo solicitado', msg2: 'Favor contatar o administrador do sistema.' }) : res.render('Erro/pageerro', { title: 'erro 404', msg1: 'O arquivo solicitado não existe', msg2: 'Favor contatar o administrador do sistema.' }); 
        }

        UploadModel.findOne({ link: req.params.filename }).exec((err, filea) => { 
            if (err) { 
                console.log(err);
                return res.render('Erro/pageerro', { title: 'erro 500', msg1: 'Erro ao apagar o arquivo solicitado', msg2: 'Favor contatar o administrador do sistema.' });
            }else if (!filea) {			 
                console.log(filea);
                res.writeHeader(200, {"Content-Type": "text/html"});  
                res.write('<h1>Feito</h1><script>window.close();</script>');  
                return res.end(); 
            } else {
                filea.status = "Apagado";
                filea.save().then(() => {
                    fs.unlink(filePath, (earr) => {
                        console.log(earr)
                    });
                });
                res.writeHeader(200, {"Content-Type": "text/html"});  
                res.write('<h1>Feito</h1><script>window.close();</script>');  
                return res.end(); 
            }
        });
        //file exists
    })
}

/**
 * Render login page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const loginPage = (req, res, next) => {
    res.render('RanNet/login', { msg: 'Express', mostrarerro: 0, errors: [] })
}

/**
 * Render home page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const maskPage = (req, res, next) => {
    res.render('mask/index')
}

/**
 * Delete secssao
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const logout = (req, res, next) => {
    if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
}

/**
 * Soom page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const soom = (req, res, next) => {
    res.render('soom');
}

/**
 * Posts page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const rantest = (req, res, next) => {

    user.findById(req.session.userId, (err, usr) => {
        res.render('RanNet/posts', { title: 'RanNet', token: jwt.sign({
            usr
        }, config.secret) });
    })
}

// =================================================
//  POSTs
// =================================================

/**
 * Auth user
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns string
 */
const loginAuth = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('RanNet/login', { mostrarerro: 0, errors: errors.array() });
    }

    user.authenticate(req.body.matricula, req.body.logpassword, (error, user) => {
        if (error || !user) {
            res.render('RanNet/login', { msg: "Senha ou matrícula incorreta", mostrarerro: 1, errors: [] });
        } else {
            req.session.admin = user.admin
            req.session.userId = user._id;
            req.session.matricula = user.matricula;
            return res.redirect('/home');
        }
    })

}

/**
 * Process upload file
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns string
 */
const uploadProcess = (req, res, next) => {
    try {
        
        fs.rename( req.files["uploads[]"].path, path.join(DownloadFolder,  req.files["uploads[]"].name.replace(" ","-")) , (err) => {
            if(err) {
                console.log(err)
                return res.status(500).end("fail")
            }
            new UploadModel({
				name: req.files["uploads[]"].name,
				creat_by: req.session.userId,
				link: req.files["uploads[]"].name.replace(" ","-"),
                status: "Ativo"
			}).save().then(() => {
                res.end('success');
            }).catch((err) =>{
                console.log(err);
				res.status(500).end("fail");
            })
        });

        // res.end("fail")
    } catch (error) {
        console.error(error)
        res.status(500).end('fail');
    }
}

/**
 * Process upload file
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns string
 */
const postRanNet = (req, res, next) => {
    console.log("Recebido as "+new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
	
    console.log(JSON.stringify(req.body, null, 2));
    
    if(req.body.data){
        // new FlowMT({
		// 	dado: req.body.data,
		// 	data: data,
		// 	hora:horaAtual
		// }).save().catch(console.error)
    }

    socket.sendNotification(req.body)

    res.end("Post Recebido");
}

// =================================================
//  Extras
// =================================================

/**
 * Change view efect
 * @param {Object} dest variavel a ser alterada
 * @param {Object} res resposta do servidor
 */
const ChangeEfect = (dest, res) => {
    res.locals.home = ''
    res.locals.uploads = ''
    res.locals.downloads = ''
    res.locals.chat = ''
    res.locals.notes = ''
    res.locals[dest] = 'active'
}

module.exports = {
    index,
    maskPage,
    userList,
    changePwdPost,
    createUser,
    resetUser,
    deleteUser,
    changePwd,
    loginAuth,
    loginPage,
    logout,
    uploadPage,
    downloadPage,
    downloadFile,
    deleteFile,
    uploadProcess,
    soom,
    rantest,
    postRanNet
}