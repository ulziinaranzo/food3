import { Router } from "express";
import { getFoodController, getFoodsController, updateFoodController, deleteFoodController, createFoodController} from "../controllers/food/index"
const foodRouter = Router();

foodRouter.get("/food/:id", getFoodController).get("/foods",getFoodsController).put("/food/:id", updateFoodController).delete("/food/:id ,m", deleteFoodController).post("/food", createFoodController)

export default foodRouter;