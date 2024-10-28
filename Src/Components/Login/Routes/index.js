const express = require('express');
const loginController = require('../Controller/index');

const router = express.Router();

// Login route
router.post('/', loginController.userLogin);
router.post('/admin', loginController.adminLogin);

module.exports = router;
