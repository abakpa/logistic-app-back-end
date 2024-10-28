const express = require('express');
const router = express.Router();
const dispatchController = require('../Controller/index'); 
const {auth, adminAuth}= require('../../Middleware');
// const auth = require('../../Middleware/index')


router.post('/:id',  dispatchController.createDispatch);
router.get('/', dispatchController.getAllDispatch);
router.get('/active', dispatchController.getActiveDispatch);
router.get('/driver', adminAuth, dispatchController.getDispatchByDriver);
router.get('/:id', dispatchController.getDispatchById);
router.get('/order/:id', dispatchController.getDispatchByOrderId);
router.put('/status/:id', auth, dispatchController.updateDispatchStatus);
// router.put('/:id', orderController.updateOrder);
// router.delete('/:id', orderController.deleteOrder);

module.exports = router;
