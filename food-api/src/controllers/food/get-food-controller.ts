import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getFoodController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;

    const food = await foodModel.findById(id).populate("category");

    if (!food) {
      return res
        .status(404)
        .json({ message: "No food found for this category" });
    }

    res.status(200).json({ message: "Food found", data: food });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving food", error });
  }
};
