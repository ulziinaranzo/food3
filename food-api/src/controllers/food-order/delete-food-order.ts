import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";

export const deleteFoodOrderController: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await foodOrderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Food order not found" });
        }

        res.status(200).json({
            message: "Food order deleted successfully",
            order: deletedOrder
        });
    } catch (error) {
        console.error("Error deleting food order:", error);
        res.status(500).json({ message: "Error deleting food order", error });
    }
};
