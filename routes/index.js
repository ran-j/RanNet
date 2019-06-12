var express = require('express');
var router = express.Router();
var controller = require("./Controllers/indexController")
var LoginRequired = require('../Middlewares/LoginRequired');
var AlreadyLogin = require('../Middlewares/AlreadyLogin');

const formidableMiddleware = require('express-formidable');
const { check } = require('express-validator/check');

var cors = require('cors');

/* POST login */
router.post('/',[
    // password must be at least 5 chars long
    check('matricula').isLength({ min: 4 }),
    check('logpassword').isLength({ min: 3 })
], controller.loginAuth)

router.get('/', AlreadyLogin, controller.loginPage)

router.post('/postrannet', cors(), controller.postRanNet)

router.get('/testes', controller.rantest)

router.use(LoginRequired)

/* GET chat. */
router.get('/chat', controller.soom)

/* GET notes. */
router.get('/notes', controller.soom)

/* GET logout redirect. */
router.get('/logout',  controller.logout)

/* GET homePage. */
router.get('/home', controller.index)

/* GET upload page. */
router.get('/uploads', controller.uploadPage)

/* GET downloads page. */
router.get('/downloads', controller.downloadPage)

/* GET file. */
router.get('/downloadfile/:filename', controller.downloadFile)

router.get('/deletefile/:filename', controller.deleteFile)

router.use(formidableMiddleware());

/* Post upload file. */
router.post('/upload', controller.uploadProcess)

module.exports = router;
