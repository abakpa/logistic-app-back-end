const dispatchService = require('../Services/index')
const driverService = require('../../Drivers/Services/index')

const createDispatch = async (req, res) => {
    try {
        const orderId = req.params.id
        req.body.order_id = orderId
     const dispatch = await dispatchService.createDispatch(req.body)
        res.status(201).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllDispatch = async (req,res) => {
    try {
        const dispatch = await dispatchService.getDispatch()
    res.status(200).json(dispatch)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getActiveDispatch = async (req,res) => {
    try {
        const dispatch = await dispatchService.getActiveDispatch()
    res.status(200).json(dispatch)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getDispatchById = async (req, res) => {
    try {
        const dispatch = await dispatchService.getDispatchById(req.params.id);
        if (!dispatch) return res.status(404).json({ message: 'Dispatch order not found' });
        res.status(200).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDispatchByOrderId = async (req, res) => {
    try {
        const dispatch = await dispatchService.getDispatchByOrderId(req.params.id);
        if (!dispatch) return res.status(404).json({ message: 'Dispatch order not found' });
        res.status(200).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDispatchByDriver = async (req, res) => {
    try {
        const driver = await driverService.getDriverByAdminId(req.admin.adminId)
        const dispatch = await dispatchService.getDispatchByDriver(driver._id);
        if (!dispatch) return res.status(404).json({ message: 'Dispatch order not found' });
        res.status(200).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDispatchedOrder = async (req, res) => {
    try {
        const order = await orderService.getOrderForPickup();
        if (!order) return res.status(404).json({ message: 'No order for pick up' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderDispatch = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateDispatchStatus = async (req, res) => {
    try {
        const userId = req.user.userId
        const orderId = req.params.id
        const order = await dispatchService.updateDispatchStatus({orderId,userId});
        console.log('new order',order)
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDispatch = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDispatch,
    getAllDispatch,
    getActiveDispatch,
    getDispatchById,
    getDispatchByOrderId,
    updateDispatchStatus,
    getDispatchByDriver
};
