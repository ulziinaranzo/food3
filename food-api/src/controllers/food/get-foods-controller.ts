import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getByCategoryAndFoodsController: RequestHandler = async (
  req,
  res
) => {
  const { categoryId } = req.query;

  try {
    if (categoryId) {
      const foodsByCategory = await foodModel
        .find({ category: categoryId })
        .populate("category");

      if (foodsByCategory.length === 0) {
        return res
          .status(404)
          .json({ message: "No foods found for this category" });
      }

      res.status(200).json({ message: "Foods by category", foodsByCategory });
    } else {
      const foods = await foodModel.find({}).populate("category");
      res.status(200).json({ message: "Food found", data: foods });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving food", error });
  }
};
