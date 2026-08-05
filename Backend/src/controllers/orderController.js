import Order from "../models/order.js";

//create order
export const createOrder = async (req, res) => {
    try{
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    }catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

//Get All Orders (Admin)
export const getOrder = async(req, res) => {
    try{
        const orders = await Order.find({
            isActive: true
        })
        .populate("user", "firstName lastName email")
        .populate("items.product", "name images price");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}

//Get Order By ID
export const getOrderById = async(req, res) => {
    try{
        const order = await Order.findById(req.params.orderId)
        .populate("user", "firstName lastName email")
        .populate("items.product", "name images price");

        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
}

// Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
      isActive: true
    })
    .populate("items.product", "name images price");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching your orders",
      error: error.message
    });

  }
};

//Update Order Status
export const updateOrderStatus = async(req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.params.orderId, {
            status: req.body.status
        },
        {
            new: true,
            runValidators: true 
        });
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({message: "Order status updated successfully", order});

    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

//Cancel Order
export const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: "cancelled"
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {

    res.status(500).json({
      message: "Error cancelling order",
      error: error.message
    });

  }
};