const mongoose = require('mongoose');

const dispatchSchema = new mongoose.Schema({
    order_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },
    driver_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver', 
        required: true 
    },
    status: { 
        type: String, 
        default:'confirm pickup'
    },
    // route: { 
    //     type: String, 
    //     required: true 
    // },
  
}, { timestamps: true });

const Dispatch = mongoose.model('Dispatch', dispatchSchema);
module.exports = Dispatch;
