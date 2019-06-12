var express = require('express');
var router = express.Router();
var controller = require("./Controllers/elizaController")
var LoginRequired = require('../Middlewares/LoginRequired');

var cors = require('cors');

/* GET users homePage. */
router.post('/say', cors(), LoginRequired, controller.say)

module.exports = router;
