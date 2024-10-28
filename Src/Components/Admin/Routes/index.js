const express = require('express');
const router = express.Router();
const adminController = require('../Controller/index');

router.post('/',adminController.registerAdmin);
// router.post('/admin',adminController.registerStaff);
router.get('/',adminController.getAdmins);
router.get('/:id',adminController.getAdminById);
router.put('/:id',adminController.updateAdmin);
router.delete('/:id',adminController.deleteAdmin);

module.exports = router;
