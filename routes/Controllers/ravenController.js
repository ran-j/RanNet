var Raven = require('../../models/Raven');

var home = path.join(__dirname.replace("routes\\Controllers", ""), '/home');
const DownloadFolder = path.join(home, '/files');

/**
 * Render home page
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const index = (req, res, next) => {
    res.end("hey friend")
}

/**
 * Return raven version
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns String
 */
const ravenVersion = (req, res, next) => {
    Raven.find({}, function(err, doc) { 
		console.log(doc);
		res.status(200).send(doc[0]);    
	});    
}

/**
 * Return a updated version of ravenAI
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns String
 */
const getUpdate = (req, res, next) => {
    let filePath = path.join(DownloadFolder, '/raven/ravenAT.zip');
    res.download(filePath)
}

module.exports = {
    ravenVersion,
    getUpdate
}