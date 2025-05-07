import { RequestHandler } from "express";
import { userModel } from "../../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "Ийм имэйлтэй хэрэглэгч байна" });
      return;
    }
    console.log("1");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("2");

    const { password: userPassword, ...userWithoutPassword } =
      newUser.toObject();
    console.log("3");

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.role === "admin" },
      process.env.JWT_NUUTS as string
    );
    console.log("4");

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
  }
};
