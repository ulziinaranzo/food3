import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";

export const getFoodOrdersController: RequestHandler = async (req, res) => {
  try {
    const foodOrders = await foodOrderModel
      .find({})
      .populate("user") 
      // .populate("foodOrderItems.food"); 

    if (!foodOrders || foodOrders.length === 0) {
      return res.status(404).json({ message: "No food orders found" });
    }

    res.status(200).json({ foodOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
