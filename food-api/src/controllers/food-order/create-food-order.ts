import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";


export const createFoodOrderController: RequestHandler = async (req, res) => {
    try {
        const { user, orderedItems, totalPrice } = req.body;

        if ( !user || !orderedItems || orderedItems.length === 0 || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = await foodOrderModel.create({
            user,
            foodOrderItems:orderedItems,
            totalPrice,
            updatedAt: new Date(),
            createdAt: new Date()
        });

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error creating food order:", error);
        return res.status(500).json({ message: "Error creating food order" });
    }
};



