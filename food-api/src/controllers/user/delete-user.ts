import { RequestHandler } from "express";
import { userModel } from "../../models/user-model"; 

export const deleteUserController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};
