var express = require('express');
var router = express.Router();
var controller = require("./Controllers/ravenController")

/* GET users homePage. */
router.get('/', controller.index)

/* GET raven version. */
router.get('/v', controller.ravenVersion)

/* GET build. */
router.get('/getupdate', controller.getUpdate)

module.exports = router;
