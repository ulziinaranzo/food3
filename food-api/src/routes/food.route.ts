import { Router } from "express";
import {
  getFoodController,
  getFoodsController,
  updateFoodController,
  deleteFoodController,
  createFoodController,
  getFoodByCategoryController,
} from "../controllers/food/index";
const foodRouter = Router();

foodRouter
  .get("/food/:id", getFoodController)
  .get("/foods", getFoodsController)
  .put("/food/:id", updateFoodController)
  .delete("/food/:id", deleteFoodController)
  .post("/food", createFoodController)
  .get("/food/category/:id", getFoodByCategoryController);

export default foodRouter;
