import { Router } from "express";
import {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUsersController,
} from "../controllers/user";
import { authorizationMiddleware } from "../middlewares/authorization-middleware";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";

const userRouter = Router();

userRouter
  .post("/user", createUserController)
  .get("/user/:id", getUserController)
  .put("/user/:id", authenticationMiddleware, updateUserController)
  .delete(
    "/user/:id",
    authenticationMiddleware,
    authorizationMiddleware,
    deleteUserController
  )
  .get("/user", getUsersController);

export default userRouter;
