var express = require('express');
var router = express.Router();

var FlowMT = require('../models/flowMeter');
var UpFiles = require('../models/filesUploads');
var Registro = require('../models/user');
var formidable = require('formidable')

var Println = require('../libs/Println');

var LoginRequired = require('../libs/LoginRequired');

var path = require('path');
var fs = require('fs');

var cors = require('cors');

const transfer = exports;

var home = path.join(__dirname.replace("routes",""), '/home');
const DownloadFolder = path.join(home, '/files');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(DownloadFolder)
	Println("login");
	if (req.session && req.session.userId) {
		res.redirect('/home');
	  }else{
		res.render('RanNet/login', { msg: 'Express', mostrarerro: 0 });
	}  	
});

router.get("/crearsuperuserrannet",function (req,res){
	var user = {
	 email: "660684",
	 nome: "Ranieri",
	 password:"1234"
	}	
	Registro.create(user)
});

router.get('/home',LoginRequired, function(req, res, next) {
	Println("pagina inicial");
	res.render('RanNet/index');
});

router.get('/uploads',LoginRequired, function(req, res, next) {
	Println("uploads");
	res.render('RanNet/uploads');
});

router.get('/downloads',LoginRequired, function(req, res,next) {
	Println("downloads");

	UpFiles.find({ 'status' : 'Ativo' }, function (err, UpFilesR) {
    res.render('RanNet/donwload', { donwloadslist: UpFilesR });                    
	});
		
}); 

router.get('/chat',LoginRequired, function(req, res, next) {
	Println("Chat");
	res.render('soom');
});

router.get('/ocr',LoginRequired, function(req, res, next) {
	Println("Chat");
	res.render('soom');
});

router.get('/downloadfile/:filename',LoginRequired, function(req, res) {
	var filename = req.params.filename;
	if(filename){
		console.log(" ");
		console.log("Solicitado baixar "+ filename +" as "+ new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));		 
		var filePath = path.join(DownloadFolder, '/'+filename);
		if (fs.existsSync(filePath)) {
			transfer.responseFile(filePath,res);
		}else{
			res.render('Erro/pageerro', { title: 'erro 404', msg1: 'O arquivo solicitado não existe', msg2: 'Favor contatar o administrador do sistema.' });
		}		
	}else{
		res.redirect("/erropagina");
	}
	
}); 

router.get('/deletefile/:filename',LoginRequired, function(req, res) {
	var filename = req.params.filename;
	if(filename){
		console.log(" ");
		console.log("Solicitado apagar arquivo "+ filename +" as "+ new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
		var filePath = path.join(DownloadFolder,filename);

		if (fs.existsSync(filePath)) {
			UpFiles.findOne({ link: filename })
				.exec(function (err, filea) { 
					if (err) { 
						console.log(err);
						res.render('Erro/pageerro', { title: 'erro 500', msg1: 'Erro ao apagar o arquivo solicitado', msg2: 'Favor contatar o administrador do sistema.' });
					}else if (!filea) {			 
						console.log(filea);
					}
					filea.status = "Apagado";
					filea.save();
					fs.unlinkSync(filePath);   
					res.redirect("/downloads");
			});
		}else{
			res.render('Erro/pageerro', { title: 'erro 404', msg1: 'O arquivo solicitado não existe', msg2: 'Favor contatar o administrador do sistema.' });
		}		
	}else{
		res.redirect("/erropagina");
	}
}); 

router.get('/testes', function(req, res, next) {
	Println("TESTES");
	res.render('RanNet/posts', { title: 'Express' });
});

router.get('/flowmeter', function(req, res, next) {
	Println("flowmeter");
	FlowMT.find({}, function(err, doc) { 
		res.render('flowmeter/flowmeter', { fdado: doc });
	});   	
});
 
router.get('/logout',LoginRequired, function (req, res, next) {
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
});

router.post('/upload',LoginRequired, function(req, res){
	// create an incoming form object
	try {
		var form = new formidable.IncomingForm();  

		// specify that we want to allow the user to upload multiple files in a single request
		form.multiples = true;

		form.maxFieldsSize = 2042220174

		form.maxFileSize = 2042220174

		// store all uploads in the /uploads directory
		form.uploadDir = DownloadFolder;

		// every time a file has been uploaded successfully,
		// rename it to it's orignal name 
		var filename;
		form.on('file', function(field, file) { 
			filename = file.name;
			fs.rename(file.path, path.join(form.uploadDir, file.name.replace(" ","-")));
		});

		// log any errors that occur
		form.on('error', function(err) {
			console.log('An error has occured: \n' + err);
		});

		// once all the files have been uploaded, send a response to the client
		form.on('end', function() {
			
			var d = new Date();		 
			var dia = d.getDate();
			var mes =  d.getMonth()+1;
			var ano = d.getFullYear();
			var data = dia+"/"+mes+"/"+ano;
	
			var Upfile = {
				nome: filename,
				data: data,
				link: filename.replace(" ","-"),
				status: "Ativo"
			}

			UpFiles.create(Upfile, function (error) {
				if (error) {			   
				console.log(error);
				res.end("File nao criado");
				} else {
				res.end("File registrado");
				}
				
			});
			res.end('success');
		});

		// parse the incoming request containing the form data
		form.parse(req);	
	} catch (error) {
		console.error(error)
	}	
});

router.post('/postrannet',cors(), function(req, res){
	console.log(" ");
	console.log("Recebido as "+new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
	
	console.log(JSON.stringify(req.body, null, 2));
	
	//io.emit('jsonpost',JSON.stringify(req.body, null, 2));
	
	if(req.body.data){

		var d = new Date(); 
		var dia = d.getDate();
		var mes =  d.getMonth()+1;
		var ano = d.getFullYear();
		var data = dia+"/"+mes+"/"+ano;

		var hora = d.getHours();
		var minuto = d.getMinutes();
		var segundos = d.getSeconds();
		var horaAtual = hora+":"+minuto+":"+segundos;	 

		var RegistroFlowMeter = {
			dado: req.body.data,
			data: data,
			hora:horaAtual
		}

		FlowMT.create(RegistroFlowMeter, function (error) {
			if (error) {			   
			  console.log(error);
			  res.end("Erro ao atualizar o registro");
			} else {
			  res.end("Registro do FLowMeter Atualizado");
			}
			
		});
	}

	res.end("Post Recebido");

});

//POST de login
router.post('/', function (req, res, next) {  
	if (req.body.matricula && req.body.logpassword) {	  
		
		Registro.authenticate(req.body.matricula, req.body.logpassword, function (error, user) {
			if (error || !user) {
				res.render('RanNet/login', { msg: "Senha ou matrícula incorreta", mostrarerro: 1 });
			} else {
				req.session.userId = user._id;
				req.session.matricula = user.matricula;
				return res.redirect('/home');
			}
		});   
	 
	} else {	   
	  res.render('RanNet/login', { msg: "Favor preencher todos os campos", mostrarerro: 1 });
	}
	
});

module.exports = router;

transfer.responseFile = function (fullFileName, res,next) {
	   
  fs.exists(fullFileName, function (exist) {
    if (exist) {
      var filename = path.basename(fullFileName);

      res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('Content-Type', 'application/octet-stream');
    
      res.sendFile(fullFileName)
    } else {
      res.sendStatus(404);
    }
    
  });
};
