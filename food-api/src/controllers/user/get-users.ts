import { RequestHandler } from "express"
import { userModel } from "../../models/user-model"

export const getUsersController: RequestHandler = async (req, res) => {
    const users = await userModel.find({}).populate("category")
    res.status(200).json({users})
}