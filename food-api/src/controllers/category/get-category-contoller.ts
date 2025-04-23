import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/food-category-model";

export const getCategoriesController: RequestHandler = async (req, res) => {
  console.log("Request to get categories received");
  try {
    const categories = await foodCategoryModel.find({});
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Failed to fetch categories" });
  }
};
