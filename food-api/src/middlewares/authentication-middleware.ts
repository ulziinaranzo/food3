import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, isAdmin } = jwt.verify(
      token,
      process.env.JWT_NUUTS as string
    ) as {
      userId: string;
      isAdmin: boolean;
    };

    (req as any).userId = userId;
    (req as any).isAdmin = isAdmin;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
