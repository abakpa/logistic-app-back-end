const express = require('express');
const router = express.Router();
const paymentController = require('../Controller/index'); 
const {auth }= require('../../Middleware/index')


router.post('/', paymentController.createOrderPayment);
router.get('/', paymentController.getOrderPayments);
router.get('/:reference', paymentController.getPaymentVerification);


module.exports = router;
