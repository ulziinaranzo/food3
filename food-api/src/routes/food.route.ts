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
import { getFoodsGroupedByCategory } from "../controllers/food/get-all-foods-by category";
const foodRouter = Router();

foodRouter
  .get("/food/:id", getFoodController)
  .get("/food", getByCategoryAndFoodsController)
  .put("/food/:id", updateFoodController)
  .delete("/food/:id", deleteFoodController)
  .post("/food", createFoodController)
  .get("/count/:categoryId", getFoodCountByCategory) 
  .get("/count", getTotalFoodCount)
  .get("/grouped-by-category", getFoodsGroupedByCategory) 
export default foodRouter;
