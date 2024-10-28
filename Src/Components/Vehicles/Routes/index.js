const express = require('express');
const vehicleController = require('../Controller/index'); 

const router = express.Router();

router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
