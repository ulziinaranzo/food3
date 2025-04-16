import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const updateFoodController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { foodName, price, image, updatedAt, category, ingredients } = req.body;

    if (!foodName) {
      return res.status(400).json({ message: "Food name is required" });
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      {
        foodName,
        price,
        image,
        updatedAt: new Date(),
        category,
        ingredients,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json({
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    return res.status(500).json({ message: "Server error while updating food" });
  }
};
