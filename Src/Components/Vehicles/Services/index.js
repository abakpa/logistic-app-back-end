const Vehicle = require('../Model/index'); 
const mongoose = require('mongoose');

const createVehicle = async (data) => {
    try {
        const vehicle = new Vehicle(data);
        await vehicle.save();
        return vehicle;
    } catch (error) {
        throw error;
    }
};

const getVehicles = async () => {
    try {
        return await Vehicle.find({});
    } catch (error) {
        throw error;
    }
};

const getVehicleById = async (vehicleId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            throw new Error('Invalid vehicle ID');
        }

        return await Vehicle.findById(vehicleId);
    } catch (error) {
        throw error;
    }
};

const updateVehicle = async (vehicleId, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            throw new Error('Invalid vehicle ID');
        }

        return await Vehicle.findByIdAndUpdate(vehicleId, data, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteVehicle = async (vehicleId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            throw new Error('Invalid vehicle ID');
        }

        return await Vehicle.findByIdAndDelete(vehicleId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
