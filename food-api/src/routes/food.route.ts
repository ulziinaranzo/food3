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
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { authorizationMiddleware } from "../middlewares/authorization-middleware";
const foodRouter = Router();

foodRouter
  .get("/food/:id", getFoodController)
  .get("/food", getByCategoryAndFoodsController)
  .put("/food/:id", authenticationMiddleware, authorizationMiddleware, updateFoodController)
  .delete("/food/:id", authenticationMiddleware, authorizationMiddleware, deleteFoodController)
  .post("/food", authenticationMiddleware, authorizationMiddleware, createFoodController)
  .get("/count/:categoryId", getFoodCountByCategory) 
  .get("/count", getTotalFoodCount)
  .get("/grouped-by-category", getFoodsGroupedByCategory) 
export default foodRouter;
