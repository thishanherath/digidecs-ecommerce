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
        const order = await Order.findById(req.params.getOrderById)
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