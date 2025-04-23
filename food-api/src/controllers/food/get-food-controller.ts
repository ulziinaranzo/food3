import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getFoodController: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId query parameter is required" });
    }

    const food = await foodModel.find({ category: categoryId }).populate("category");

    if (food.length === 0) {
      return res.status(404).json({ message: "No food found for this category" });
    }

    res.status(200).json({ message: "Food found", data: food });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving food", error });
  }
};
