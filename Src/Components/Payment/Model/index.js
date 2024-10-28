const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true
     },
    orderId: { 
        type: String, 
        required: true
     },
     quantity: { 
        type: Number, 
        required: true
     },
     weight: { 
        type: Number, 
        required: true
     },
     value: { 
        type: Number, 
        required: true
     },
     insurance: { 
        type: Number, 
        required: true
     },
     shipping_cost: { 
        type: Number, 
        required: true
     },
     total_cost: { 
        type: Number, 
        required: true
     },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
