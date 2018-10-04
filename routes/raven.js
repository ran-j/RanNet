var express = require('express');
var router = express.Router();

var Println = require('../libs/Println');
var Raven = require('../models/Raven');

var bot = require('../libs/elizaBot');

router.get('/', function(req, res, next) {
	Println("Renderização da Raven");
	res.render('Raven/raven');    
});

router.get('/v', function(req, res, next) {	
	Raven.find({}, function(err, doc) { 
		console.log(doc);
		res.status(200).send(doc[0]);    
	});         
});

router.get('/getupdate', function(req, res, next) {
	var filePath = path.join(DownloadFolder, '/raven/ravenAT.zip');
	transfer.responseFile(filePath,res);
});

router.get('/bot', function(req, res, next) {
	BotConversation(req,res);
});

router.get('/bot/:tet', function(req, res, next) {
	BotConversation(req,res);
});

module.exports = router;

function BotConversation(req,res){
    var input = decodeURIComponent(req.url).substring(1);
    var elis = new bot();

    if (input){
        var out = elis.transform(input);
        console.log('YOU:   '+input);
        res.end(out);
        console.log('ELIZA: '+out);
    }else{
        var out = elis.getInitial();
        res.end(out);
        console.log('ELIZA: '+out);
    }	
}
