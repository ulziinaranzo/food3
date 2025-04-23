import { Router } from "express";
import {
  getFoodController,
  getFoodsController,
  updateFoodController,
  deleteFoodController,
  createFoodController,
} from "../controllers/food/index";
const foodRouter = Router();

foodRouter
  .get("/food/:id", getFoodController)
  .get("/food", getFoodsController)
  .put("/food/:id", updateFoodController)
  .delete("/food/:id", deleteFoodController)
  .post("/food", createFoodController)

export default foodRouter;
