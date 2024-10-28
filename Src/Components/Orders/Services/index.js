const mongoose = require('mongoose');
const Order = require('../Model/index'); 
const { createDispatch } = require('../../Dispatch/Services');
const Driver = require('../../Drivers/Model');
const Dispatch = require('../../Dispatch/Model');

const createOrder = async (data) => {
    data.orderId="ABC" + Math.floor(Math.random() * 10000);
    data.payment_status=0
    data.insurance = data.value*0.10
    const total_weight = data.weight*1000
    data.shipping_cost = data.quantity*total_weight
    data.total_cost = data.insurance+data.shipping_cost
    try {
        const order = new Order(data);
        await order.save();
        return order;
    } catch (error) {
        throw error;
    }
};

const updateOrderPaymentStatus = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid order ID');
        }
    await Order.findByIdAndUpdate(id, {payment_status:1}, { new: true })
    } catch (error) {
        throw error;
    }
};

const getOrders = async () => {
    try {
        return await Order.find({}).populate('user_id');
    } catch (error) {
        throw error;
    }
};
const getDriverOrder = async (adminId) => {
    try {
        const isUserADriver = await Driver.findOne({admin_id:adminId});
        if(!isUserADriver){
            return "You are not a rider"
        }
        const riderOrder = await Dispatch.findOne({driver_id:isUserADriver._id,status: { $ne: "order completed" }})
        if(!riderOrder){
            return "You do not have an existing order"
        }
        return await Order.find({_id:riderOrder.order_id});
    } catch (error) {
        throw error;
    }
};

const getOrderById = async (orderId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error('Invalid order ID');
        }

        return await Order.findById(orderId).populate('user_id');
    } catch (error) {
        throw error;
    }
};
const getOrderByUser = async (userId) => {
    try {
        return await Order.find({user_id:userId , payment_status:1}).populate('user_id');
    } catch (error) {
        throw error;
    }
};
const getOrderForPickup = async () => {
    try {
        return await Order.find({status:"order created",payment_status:1}).populate('user_id');
    } catch (error) {
        throw error;
    }
};

const updateOrder = async (orderId, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error('Invalid order ID');
        }

        return await Order.findByIdAndUpdate(orderId, data, { new: true });
    } catch (error) {
        throw error;
    }
};
const updateOrderStatus = async (data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(data.orderId)) {
            throw new Error('Invalid order ID');
        }
        const order = await Order.findOne({_id:data.orderId,user_id:data.userId})
        if(!order){
            throw new Error('Invalid order')
        }
      if(order.status==="waiting for pickup"){
        return await Order.findByIdAndUpdate(data.orderId, {status:"Item dispatched"}, { new: true });
        }else if(order.status==="Item dispatched"){
        return await Order.findByIdAndUpdate(data.orderId, {status:"Item delivered"}, { new: true });
        }else{
            return ('Item has been delivered')
        }
    } catch (error) {
        throw error;
    }
};
const updateOrderStatusByDriver = async (data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(data.orderId)) {
            throw new Error('Invalid order ID');
        }
        const order = await Order.findById(data.orderId)
        const adminId = data.adminId
        const driver = await Driver.findOne({admin_id:adminId})
        if(!driver){
            return "You are not a driver"
        }
        const checkDispatch = await Dispatch.findOne({order_id:data.orderId,driver_id:driver._id})
        const order_id = data.orderId
        const dispatch = {order_id,adminId}
        if(order.status==="order created"){
            const checkDispatch = await createDispatch(dispatch)
            if(checkDispatch.status==="confirm pickup"){
                return await Order.findByIdAndUpdate(order_id, {status:"waiting for pickup"}, { new: true });
            }else{
                return checkDispatch
            }
        }else if(order.status==="waiting for pickup" && checkDispatch.status==="confirm pickup"){
        return await Order.findByIdAndUpdate(data.orderId, {status:"Item dispatched"}, { new: true });
        }else if(order.status==="Item dispatched" && checkDispatch.status==="Item dispatched"){
        return await Order.findByIdAndUpdate(data.orderId, {status:"Item delivered"}, { new: true });
        }else if(order.status==="Item delivered" && checkDispatch.status==="Item delivered"){
        await Dispatch.findOneAndUpdate({order_id:data.orderId,driver_id:driver._id}, {status:"order completed"}, { new: true });
        return await Order.findByIdAndUpdate(data.orderId, {status:"Order completed"}, { new: true });
        }else if(order.status==="Item dispatched" && checkDispatch.status==="confirm pickup"){
            return "Wait for pick up confirmation";
        }else if(order.status==="Item delivered" && checkDispatch.status==="Item dispatched"){
            return "Wait for delivery confirmation";
        }else{
            return ('Item has been delivered')
        }
    } catch (error) {
        throw error;
    }
};

const deleteOrder = async (orderId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error('Invalid order ID');
        }

        return await Order.findByIdAndDelete(orderId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrder,
    updateOrderPaymentStatus,
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
