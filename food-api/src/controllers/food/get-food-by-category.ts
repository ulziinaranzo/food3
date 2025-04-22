"use client";
import { RequestHandler, Router } from "express";
import { foodModel } from "../../models/food-model";

const router = Router();

export const getFoodByCategoryController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const foods = await foodModel.find({ category: id }).populate("category");

    if (!foods || foods.length === 0) {
      return res
        .status(400)
        .json({ message: "No foods found for this category" });
    }
    res.status(200).json({ foods });
  } catch (error) {
    console.error("Error fetching foods by category:", error);
    res.status(500).json({ message: "Error fetching foods" });
  }
};
export default router;
