const Driver = require('../Model/index');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const createDriver = async (data) => {
    try {
        const isExisting = await Driver.findOne({user_id:data.user_id})
        if(isExisting){
            throw new Error('The staff is already a driver')
        }
        const driver = new Driver(data);
        await driver.save();
        return driver;
    } catch (error) {
        throw error;
    }
};

const getDrivers = async () => {
    try {
        return await Driver.find({}).populate('admin_id').populate('vehicle_id');
    } catch (error) {
        throw error;
    }
};
const getDriverByAdminId = async (adminId) => {
    try {
        return await Driver.findOne({admin_id:adminId}).populate('vehicle_id').populate('admin_id');
    } catch (error) {
        throw error;
    }
};

const getDriverById = async (driverId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(driverId)) {
            throw new Error('Invalid driver ID');
        }

        return await Driver.findById(driverId).populate('vehicle_id');
    } catch (error) {
        throw error;
    }
};

const updateDriver = async (driverId, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(driverId)) {
            throw new Error('Invalid driver ID');
        }

        return await Driver.findByIdAndUpdate(driverId, data, { new: true }).populate('vehicle_id');
    } catch (error) {
        throw error;
    }
};

const deleteDriver = async (driverId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(driverId)) {
            throw new Error('Invalid driver ID');
        }

        return await Driver.findByIdAndDelete(driverId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
    getDriverByAdminId};
