const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    license_plate: { 
        type: String, 
        unique: true, 
        required: true 
    }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
