import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getFoodsController: RequestHandler = async (req, res) => {
  const foods = await foodModel.find({}).populate("category")
res.status(200).json({foods})
}