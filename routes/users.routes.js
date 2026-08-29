var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
const { requireAuthUser } = require('../middlewares/auth.middlewares');

// CRUD routes for users
router.post('/', userController.createUser);
router.get('/', requireAuthUser, userController.getUsers);
router.get('/hello', userController.hello);
router.get('/verify-email/:token', userController.verifyEmail);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
