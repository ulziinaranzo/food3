import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";

export const createFoodOrderController: RequestHandler = async (req, res) => {
    try {
        const { id, orderedItems, totalPrice } = req.body;

        if (!id || !orderedItems || orderedItems.length === 0 || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new foodOrderModel({
            user: id,
            totalPrice,
            foodOrderItems: orderedItems,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating food order" });
    }
};
