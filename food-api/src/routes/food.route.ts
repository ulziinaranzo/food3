import { Router } from "express";
import { getFoodController } from "../controllers/food/get-food-controller";
import { getFoodsController } from "../controllers/food/get-foods-controller";
import { updateFoodController } from "../controllers/food/update-food-controller";
import { deleteFoodController } from "../controllers/food/delete-food-controller";
import { createFoodController } from "../controllers/food/create-food-controller";

const foodRouter = Router();

foodRouter.get("/food/:id", getFoodController).get("/foods",getFoodsController).put("/food:id", updateFoodController).delete("/food:id", deleteFoodController).post("/food", createFoodController)

export default foodRouter;