import { request } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc  Create a new Order
// @route POST /api/orders
// @access Public
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    userId,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    napomena,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      napomena, 
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});


// @desc  GET Order by ID
// @route POST /api/orders/:id
// @access Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name  email')
  if(order){
    res.json(order)
  }
  else{
    request.status(404)
    throw new Error('Order not found')
  }
});



// @desc  Update Order to paid
// @route GET /api/orders/:id/pay
// @access Public
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time:req.body.update_time,
      email_address: req.body.payer.email_address,
      napomena: req.body.payer.napomena
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else{
    request.status(404)
    throw new Error('Order not found')
  }
});




// @desc  GET logged in user orders
// @route GET /api/orders/myorders/:userId
// @access Public
const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.find({ user: userId });
  res.json(orders);
});




export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
