// npm install mongoose uuid

const Order = require('../models/order_model');

// Function to save a new order
async function create(order) {
  try {
    // Create a new order
    const newOrder = new Order(order);

    // Save the order to the database
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Function to get an order by order id
async function getOneByOrderId(orderId) {
  try {
    const order = await Order.findOne({ order_id: orderId });
    return order;
  } catch (error) {
    console.error('Error getting order by order_id:', error);
    throw error;
  }
}

// Function to find all orders
async function findAll() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error finding orders:', error);
    throw error;
  }
}

async function updateOne(orderId, updateData) {
  console.log("Repo")
  try {
    const existingOrder = await Order.findOne({ order_id: orderId });

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    delete updateData._id;
    Object.assign(existingOrder, updateData);
    existingOrder.updated_at = new Date();
    const updatedOrder = await existingOrder.save();
  
    return updatedOrder;
    
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

async function deleteOne(orderId) {
  try {
    const deletedOrder = await Order.findOneAndDelete({ order_id: orderId });
    
    if (!deletedOrder) {
      throw new Error('Order not found');
    }

    return deletedOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

module.exports = { create, getOneByOrderId, findAll, updateOne, deleteOne };