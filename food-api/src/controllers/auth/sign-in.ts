import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    }
    const { password: storedPassword, ...userWithoutPassword } =
      user.toObject();
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.role === "admin" },
      process.env.JWT_NUUTS as string
    );
    return res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    return res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
  }
};
