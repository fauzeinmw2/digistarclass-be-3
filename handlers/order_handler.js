const orderUsecase = require('../domain/usecases/order_usecase');

// Handler to create a new order
async function create(req, res) {
  try {
    const orderData = req.body;
    const userId = req.user.userId; 

    const orderDataWithUser = {
      ...orderData,
      created_by: userId
    };

    const createdOrder = await orderUsecase.create(orderDataWithUser);
    res.status(201).json({ message: "Order created successfully", orderId: createdOrder.order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get list of orders
async function getList(req, res) {
  try {
    const orders = await orderUsecase.getList();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get an order by order id
async function getOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderUsecase.getOneByOrderId(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function updateOne(req, res){
  console.log("handler")
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    const updatedOrder = await orderUsecase.updateOne({ order_id: orderId, ...updateData });
    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const orderId = req.params.id;
    const deletedOrder = await orderUsecase.deleteOne(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByOrderId, updateOne, deleteOne };