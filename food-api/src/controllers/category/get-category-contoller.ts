import { RequestHandler } from "express"
import { foodCategoryModel } from "../../models/food-category-model"

export const getCategoriesController = async (req, res) => {
  const categories = await foodCategoryModel.find({});
  return res.status(200).json({
    categories,
  })
}