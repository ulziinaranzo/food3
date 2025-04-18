import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const getFoodsController: RequestHandler = async (req, res) => {
  try {
    const foods = await foodModel.find({}).populate("category");
    
    if (!foods) {
      return res.status(404).json({ message: "No foods found" });
    }

    res.status(200).json({ foods });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
