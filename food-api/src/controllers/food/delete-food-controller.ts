import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const deleteFoodController: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await foodModel.findByIdAndDelete(id)

        if (!deleted) {
            res.status(404).json({message: "Food not found"})
        }
        res.status(200).json({message: "Food deleted", food: deleted})
    }
    catch (error) {
        res.status(500).json({message: "Error deleting food"})
    }
}