import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

export const getUsersController: RequestHandler = async (req, res) => {
  try {
    const users = await userModel.find({});

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Server error, please try again later." });
  }
};