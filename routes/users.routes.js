var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');

/* GET users listing. */
router.get('/hello', userController.hello);





module.exports = router;
