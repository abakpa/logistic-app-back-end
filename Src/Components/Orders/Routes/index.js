const express = require('express');
const router = express.Router();
const orderController = require('../Controller/index'); 
const {auth, adminAuth }= require('../../Middleware/index')


router.post('/', auth, orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/orderbydriver', auth, orderController.getDriverOrder);
router.get('/user', auth, orderController.getOrderByUser);
router.get('/orderforpickup', auth, orderController.getOrderForPickup);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.put('/status/:id', auth, orderController.updateOrderStatus);
router.put('/dispatch/:id', adminAuth, orderController.updateOrderStatusByDriver);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
