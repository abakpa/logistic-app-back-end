const driverService = require('../Services/index');

const createDriver = async (req, res) => {
    try {
        const driver = await driverService.createDriver(req.body);
        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDriverById = async (req, res) => {
    try {
        const driver = await driverService.getDriverById(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDriver = async (req, res) => {
    try {
        const driver = await driverService.updateDriver(req.params.id, req.body);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDriver = async (req, res) => {
    try {
        const driver = await driverService.deleteDriver(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.status(200).json({ message: 'Driver deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
};
