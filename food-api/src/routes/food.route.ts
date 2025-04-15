import { Router } from "express";
import { getFood } from "../controllers/food/get-food";
import { getFoods } from "../controllers/food/get-foods";

const foodRouter = Router();

foodRouter.get("/food", getFood).get("/foods",getFoods).post("/food", (req, res) => { })

export default foodRouter;