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
        const orders = await Oder.find({
            isActive: true
        })
        .populate("user", "firstName lastName email")
        .populate("items.product", "name images price");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}