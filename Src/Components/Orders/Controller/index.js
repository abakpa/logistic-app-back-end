const orderService = require('../Services/index'); 

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDriverOrder = async (req, res) => {
    try {
        const adminId = req.user.userId
        const orders = await orderService.getDriverOrder(adminId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderByUser = async (req, res) => {
    try {
        const userId = req.user.userId
        const order = await orderService.getOrderByUser(userId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderForPickup = async (req, res) => {
    try {
        const order = await orderService.getOrderForPickup();
        if (!order) return res.status(404).json({ message: 'No order for pick up' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const userId = req.user.userId
        const orderId = req.params.id
        const order = await orderService.updateOrderStatus({orderId,userId});
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateOrderStatusByDriver = async (req, res) => {
    try {
        const adminId = req.admin.adminId
        const orderId = req.params.id
        const order = await orderService.updateOrderStatusByDriver({orderId,adminId});
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getDriverOrder,
    getOrderById,
    updateOrder,
    getOrderForPickup,
    updateOrderStatus,
    deleteOrder,
    updateOrderStatusByDriver,
    getOrderByUser
};
