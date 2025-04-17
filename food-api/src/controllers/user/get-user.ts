import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

export const getUserController: RequestHandler = async ( req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id)

        if (!user) {
            res.status(404).json({message: "User not found"})
        }
        res.status(200).json({user: user})
    }
    catch(error) {
        res.status(500).json({message: "Server error", error})
    }
}
