import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getFoodCountByCategory: RequestHandler = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const count = await foodModel.countDocuments({category: categoryId});
        res.status(200).json({categoryId, foodCount: count})
    } catch (error) {
        console.error("Error counting foods by category:", error)
        res.status(500).json({message: "Server error"})
    }
}