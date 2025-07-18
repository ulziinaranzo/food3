import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_NUUTS = process.env.JWT_NUUTS || "defaultSecret";

export const signUpController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "Ийм имэйлтэй хэрэглэгч байна" }); // ✅ 409 status code
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // ✅ password-г хасаж, бүх талбарыг буцаах
    const { password: userPassword, ...userWithoutPassword } =
      newUser.toObject();

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.role === "admin" },
      JWT_NUUTS,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Бүртгэл амжилттай, нэвтэрсэн!",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signup error", error);
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
  }
};
