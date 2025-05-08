import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";

export const updateUserController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, phoneNumber, password, role, isVerified, email } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "Энэ хэрэглэгч байхгүй байна" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        address,
        phoneNumber,
        password,
        role,
        isVerified,
        email,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating user" });
  }
};
