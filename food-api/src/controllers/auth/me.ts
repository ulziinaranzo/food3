import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

export const getMe: RequestHandler = async ( req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select("-password")

        if (!user) {
            res.status(404).json({message: "Хэрэглэгч олдсонгүй"})
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Сервер алдаа", error})
    }
}