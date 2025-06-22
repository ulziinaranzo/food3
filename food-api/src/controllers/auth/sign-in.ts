import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }

    const { password: storedPassword, ...userWithoutPassword } =
      user.toObject();
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.role === "admin" },
      process.env.JWT_NUUTS!
    );
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
  }
};
