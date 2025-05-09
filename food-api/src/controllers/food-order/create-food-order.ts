import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/food-order-model";
import { userModel } from "../../models/user-model";
import { foodModel } from "../../models/food-model";

export const createFoodOrderController: RequestHandler = async (req, res) => {
  try {
    const { userId, orderedItems } = req.body;

    if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
      return res.status(400).json({ message: "Захиалга хоосон байна" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });

    let totalPrice = 0;

    const detailedItems = await Promise.all(
      orderedItems.map(async ({ food, quantity }) => {
        const foundFood = await foodModel.findById(food);
        if (!foundFood) return Error(`Хоол олдсонгүй: ${food}`);
        totalPrice += foundFood.price * quantity;
        return {
          food: foundFood._id,
          quantity,
        };
      })
    );

    const deliveryFee = 6000;
    totalPrice += deliveryFee;

    const newOrder = await foodOrderModel.create({
      user,
      foodOrderItems: detailedItems,
      totalPrice,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      totalPrice,
      address: user.address,
    });
  } catch (error) {
    console.error("Error creating food order:", error);
    return res.status(500).json({ message: "Error creating food order" });
  }
};
