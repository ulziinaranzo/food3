import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

export const createUserController: RequestHandler = async (req, res) => {
    try {
      const {
        email,
        password,
        phoneNumber,
        address,
        role,
        orderedItems,
        isVerified,
      } = req.body;
  
      const user = await userModel.create({
        email,
        password,
        phoneNumber,
        address,
        role,
        orderedItems,
        isVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      return res.status(201).json({ message: "User created", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  };
  