import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const updateFoodController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      {
        ...updatedData,
        updatedAt: new Date(), 
      },
      { new: true }
    );

    if (!updatedFood) {
res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    return res.status(500).json({ message: "Server error while updating food" });
  }
};
