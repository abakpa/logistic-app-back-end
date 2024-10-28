const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    user_email: { 
        type: String, 
        required: true 
    },
    orderId: { 
        type: String, 
        required: true 
    },
    description: { 
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
    payment_status: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default:'order created'
    },
    pickup_address: { 
        type: String, 
        required: true 
    },
    delivery_address: { 
        type: String, 
        required: true 
    }
}, 
{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
