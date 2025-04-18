import { Router } from "express";
import { createUserController, getUserController, updateUserController, deleteUserController, getUsersController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/user", createUserController)
.get("/user/:id", getUserController).put("/user/:id", updateUserController).delete("/user/:id", deleteUserController).get("/user", getUsersController)

export default userRouter;