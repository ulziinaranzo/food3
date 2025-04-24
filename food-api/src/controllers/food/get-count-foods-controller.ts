import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getTotalFoodCount: RequestHandler = async ( req, res) => {
    try {
        const count = await foodModel.countDocuments();
        res.status(200).json({totalFoods: count})
    } catch (error) {
        console.error("Error counting foods:", error);
        res.status(500).json({message: "Server error"})
    }
}