const express = require('express');
const driverController = require('../Controller/index');
const {auth} = require('../../Middleware/index')


const router = express.Router();

router.post('/', auth, driverController.createDriver);

router.get('/', auth, driverController.getDrivers);

router.get('/:id', driverController.getDriverById);

router.put('/:id', driverController.updateDriver);

router.delete('/:id', driverController.deleteDriver);

module.exports = router;
