var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');

// CRUD routes for users
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/hello', userController.hello);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
