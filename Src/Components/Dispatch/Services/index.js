const {geocode,calculateRoute }= require('../../Mapcode/index');
const mongoose = require('mongoose');
const Order = require('../../Orders/Model/index')
const Dispatch = require("../Model");
const Driver = require('../../Drivers/Model');
// const User = require('../../Users/Model');
const Admin = require('../../Admin/Model');

const createDispatch = async (data) => {
     try {
          // req.body.route = await getRouteForDispatch(orderId)
        const orderIsExixting = await Dispatch.findOne({order_id:data.order_id})
        if(orderIsExixting){
            return ('Order has already been dispatched')
        }
        const userIsDriver = await Driver.findOne({admin_id:data.adminId})
        if(!userIsDriver){
            return ('You are not a dispatch rider')
        }
        const existingOrderByDriver = await Dispatch.find({driver_id:userIsDriver._id})
        const checkExistingOrderByDriver = existingOrderByDriver.find(driverStatus=>driverStatus.status === 'confirm pickup'|| driverStatus.status === 'Item dispatched')
        if(checkExistingOrderByDriver){
            return "You have an existing order"
        }
       const dispatch = new Dispatch({order_id:data.order_id,driver_id:userIsDriver._id});
       await dispatch.save();
       return dispatch
     } catch (error) {
        throw error
     }
}
const getDispatch = async () => {
    try {
        return await Dispatch.find({}).populate('driver_id');
    } catch (error) {
        throw error;
    }
};
const getActiveDispatch = async () => {
    try {
      const dispatches = await Dispatch.find({ status: { $ne: "order completed" } });
  
      if (dispatches.length === 0) {
        throw new Error("No active dispatches found");
      }
  
      const results = await Promise.all(dispatches.map(async (dispatch) => {
        const order = await Order.findById(dispatch.order_id);  
        const driver = await Driver.findById(dispatch.driver_id);  
        const admin = await Admin.findById(driver.admin_id);  

        return {
          dispatch,
          order,
          admin,
        };
      }));
  
      return results;  
    } catch (error) {
      throw error;
    }
  };
  
const getDispatchByDriver = async (driverId) => {
    try {
        const dispatches = await Dispatch.find({ driver_id: driverId }).populate('driver_id');
        const undeliveredDispatch = dispatches.find(dispatch => dispatch.status !== 'order completed');
        return undeliveredDispatch || null;
    } catch (error) {
        throw error;
    }
};

const getDispatchById = async (dispatchId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(dispatchId)) {
            throw new Error('Invalid dispatch ID');
        }

        return await Dispatch.findById(dispatchId).populate('driver_id');
    } catch (error) {
        throw error;
    }
};
const getDispatchByOrderId = async (orderId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error('Invalid dispatch ID');
        }

        return await Dispatch.findOne({order_id:orderId}).populate('driver_id');
    } catch (error) {
        throw error;
    }
};
const updateDispatchStatus = async (data) => {
    try {
        // Validate the order ID
        if (!mongoose.Types.ObjectId.isValid(data.orderId)) {
            throw new Error('Invalid order ID');
        }

        // Find dispatch and order
        const dispatch = await Dispatch.findOne({ order_id: data.orderId });
        const checkOrder = await Order.findOne({ _id: data.orderId, user_id: data.userId });

        if (!dispatch || !checkOrder) {
            throw new Error('Order or Dispatch not found');
        }

        const driver_id = dispatch.driver_id.toString();

        // Check various conditions and return appropriate results
        if (dispatch.status === "confirm pickup" && checkOrder.status === "Item dispatched") {
            const updatedDispatch = await Dispatch.findOneAndUpdate(
                { order_id: data.orderId, driver_id },
                { status: "Item dispatched" },
                { new: true }
            );
            return { message: "Order has been picked up", updatedDispatch };
        } else if (dispatch.status === "Item dispatched" && checkOrder.status === "Item delivered") {
            const updatedDispatch = await Dispatch.findOneAndUpdate(
                { order_id: data.orderId, driver_id },
                { status: "Item delivered" },
                { new: true }
            );
            return { message: "Item has been delivered", updatedDispatch };
        } else if (dispatch.status === "confirm pickup" && checkOrder.status === "waiting for pickup") {
            return { message: "Wait for a dispatch rider to pick up" };
        } else if (dispatch.status === "Item dispatched" && checkOrder.status === "Item dispatched") {
            return { message: "Wait for delivery" };
        } else if (dispatch.status === "Item delivered" && checkOrder.status === "Item delivered") {
            return { message: "Wait for rider's update" };
        } else {
            return { message: "Order completed" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

async function getRouteForDispatch(orderId) {
    try {
        const dispatch = await Order.findById(orderId);
        if (!dispatch) {
            throw new Error('Dispatch not found');
        }

        let { pickup_address, delivery_address } = dispatch;

        // Geocode pickup and delivery addresses if coordinates are not available
        // if (!pickup_location.latitude || !pickup_location.longitude) {
            pickup_location = await geocode(pickup_address);
        // }

        // if (!delivery_location.latitude || !delivery_location.longitude) {
            delivery_location = await geocode(delivery_address);
        // }
        console.log("checking",pickup_location,delivery_location)

        // Calculate the route
        const route = await calculateRoute(pickup_location, delivery_location);

        // Update the dispatch with the route details
        dispatch.route = route;
        await dispatch.save();

        return dispatch;
    } catch (error) {
        console.error('Error getting route for dispatch:', error);
        throw error;
    }
}

module.exports = {
    createDispatch,
    getDispatch,
    getActiveDispatch,
    getDispatchById,
    getDispatchByOrderId,
    updateDispatchStatus,
    getDispatchByDriver
}