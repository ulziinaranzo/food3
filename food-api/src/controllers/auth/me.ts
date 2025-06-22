import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).userId;
    const user = await userModel
      .findById(userId)
      .select("-password")
      .populate({
        path: "orderedItems",
        populate: {
          path: "foodOrderItems.food",
          model: "food",
        },
      });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Сервер алдаа", error });
  }
};
