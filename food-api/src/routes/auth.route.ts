import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe } from "../controllers/auth/me";
import { signIn } from "../controllers/auth/sign-in";
import { signUpController } from "../controllers/auth/sing-up";

export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signin", signIn)
  .post("/signup", signUpController);
