import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";

export const updateFoodOrderController: RequestHandler = async (req, res) => {
    try {
        const { id, orderedItems, totalPrice } = req.body;

        if (!id || !orderedItems || orderedItems.length === 0 || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedOrder = await foodOrderModel.findByIdAndUpdate(
            id,
            {
                foodOrderItems: orderedItems,
                totalPrice,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating food order" });
    }
};
