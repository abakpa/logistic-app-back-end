const express = require('express');
const router = express.Router();

const userRoutes = require('./Components/Users/Routes/index');
const adminRoutes = require('./Components/Admin/Routes/index');
const orderRoutes = require('./Components/Orders/Routes/index');
const vehicleRoutes = require('./Components/Vehicles/Routes/index');
const driverRoutes = require('./Components/Drivers/Routes/index');
const loginRoutes = require('./Components/Login/Routes/index');
const dispatchRoutes = require('./Components/Dispatch/Routes/index');
const paymentRoutes = require('./Components/Payment/Routes/index');


router.use('/api/users', userRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/vehicles', vehicleRoutes);
router.use('/api/drivers', driverRoutes);
router.use('/api/login', loginRoutes);
router.use('/api/dispatch', dispatchRoutes);
router.use('/api/payment', paymentRoutes);

module.exports = router;