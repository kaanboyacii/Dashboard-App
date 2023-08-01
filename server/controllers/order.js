import { createError } from "../utility/error.js";
import User from "../models/User.js"
import Order from "../models/Order.js";

export const addOrder = async (req, res, next) => {
  const newOrder = new Order({ userId: req.user.id, ...req.body });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder)
  } catch (err) {
    next(err)
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(createError(404, 'Order not found!'));
    if (req.user.id === order.userId) {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted.');
    } else {
      return next(createError(403, 'You can delete only your order!'));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllOrder= async (req, res, next) => {
  try {
    const Orders = await Order.find({});
    res.status(200).json(Orders);
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const Orders = await Order.find({ userId });
    res.status(200).json(Orders);
  } catch (err) {
    next(err);
  }
};