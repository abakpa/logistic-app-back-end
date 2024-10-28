const express = require('express');
const router = express.Router();
const userController = require('../Controller/index');

router.post('/', userController.registerUser);
router.post('/admin', userController.registerStaff);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
