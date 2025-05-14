import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";

export const getFoodOrderController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const foodOrders = await foodOrderModel
      .find({ user: id })
      .populate("user", "address")
      .populate("foodOrderItems.food");

    if (!foodOrders || foodOrders.length === 0) {
      return res.status(200).json({ foodOrders: [] });
    }

    return res.status(200).json({ foodOrders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
