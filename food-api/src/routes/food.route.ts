import { Router } from "express";
import {
  getFoodController,
  getByCategoryAndFoodsController,
  updateFoodController,
  deleteFoodController,
  createFoodController,
  getFoodCountByCategory,
} from "../controllers/food/index";
import { getTotalFoodCount } from "../controllers/food/get-count-foods-controller";
const foodRouter = Router();

foodRouter
  .get("/food/:id", getFoodController)
  .get("/food", getByCategoryAndFoodsController)
  .put("/food/:id", updateFoodController)
  .delete("/food/:id", deleteFoodController)
  .post("/food", createFoodController)
  .get("/count/:categoryId", getFoodCountByCategory) 
  .get("/count", getTotalFoodCount) 
export default foodRouter;
