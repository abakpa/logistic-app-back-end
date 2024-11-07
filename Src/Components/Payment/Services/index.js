const Payment = require('../Model/index');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Order = require ('../../Orders/Model/index')
const axios = require('axios');
const { updateOrderPaymentStatus } = require('../../Orders/Services');

const PAYSTACK_SECRET_KEY ='sk_test_5df6a8647d7f18662fdb04725592229a3412056d';

const createOrderPayment = async (data) => {

    // const { email, amount } = data;
  
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: data.user_email,
          amount: data.total_cost * 100, // Convert to kobo
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );
       return {reference: response.data.data.reference}; // Return reference to the frontend
    } catch (error) {
      console.error(error);
      throw error
    //   res.status(500).json({ message: 'Payment failed' });
    }
};

const getPaymentVerification = async (reference,id)=>{
    try {
      // Verify the transaction
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      if (response.data.data.status === 'success') {
        const paymentOrder = await Order.findOne({_id:id})
            await updateOrderPaymentStatus(id)
            const data = {
                order_id:paymentOrder._id,
                orderId:paymentOrder.orderId,
                quantity:paymentOrder.quantity,
                weight:paymentOrder.weight,
                value:paymentOrder.value,
                insurance:paymentOrder.insurance,
                shipping_cost:paymentOrder.shipping_cost,
                total_cost:paymentOrder.total_cost
            }
            const payment = new Payment(data)
            await payment.save()
        return ({ message: 'Payment successful', data: response.data.data });
      } else {
        return ({ message: 'Payment failed' });
      }
    } catch (error) {
      console.error(error);
      console.log({ message: 'Transaction verification failed' });
    }
}
const getPayments = async () => {
    try {
        return await Payment.find({});
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createOrderPayment,
    getPaymentVerification,
    getPayments,
  
};
