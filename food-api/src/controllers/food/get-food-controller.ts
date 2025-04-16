import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";


export const getFoodController: RequestHandler = async (req, res) => {
try {
  const { id } = req.params;
  const food = await foodModel.findById(id)

  if (!food) {
    res.status(404).json({message: "Food not found"})
  }
  res.status(200).json({message: "Food found"})
}
catch(error) {
   res.status(500).json({message: "Error"})
}
}