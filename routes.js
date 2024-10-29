const express = require('express');
const router = express.Router();

const userRoutes = require('./Src/Components/Users/Routes/index');
const adminRoutes = require('./Src/Components/Admin/Routes/index');
const orderRoutes = require('./Src/Components/Orders/Routes/index');
const vehicleRoutes = require('./Src/Components/Vehicles/Routes/index');
const driverRoutes = require('./Src/Components/Drivers/Routes/index');
const loginRoutes = require('./Src/Components/Login/Routes/index');
const dispatchRoutes = require('./Src/Components/Dispatch/Routes/index');
const paymentRoutes = require('./Src/Components/Payment/Routes/index');


router.use('/api/users', userRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/vehicles', vehicleRoutes);
router.use('/api/drivers', driverRoutes);
router.use('/api/login', loginRoutes);
router.use('/api/dispatch', dispatchRoutes);
router.use('/api/payment', paymentRoutes);

module.exports = router;