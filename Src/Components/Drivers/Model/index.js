const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    admin_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    vehicle_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle' 
    }
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
