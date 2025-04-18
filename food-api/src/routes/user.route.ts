import { Router } from "express";
import { createUserController, getUserController, updateUserController, deleteUserController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/user", createUserController)
.get("/user/", getUserController).put("/user/:id", updateUserController).delete("/user/:id", deleteUserController)

export default userRouter;