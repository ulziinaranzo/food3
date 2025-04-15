import { Router } from "express";
import { createCategoryController } from "../controllers/category/create-category.controller";

const categoryRouter = Router();

categoryRouter.get("/category", createCategoryController).post("/category", (req, res) => {})

export default categoryRouter;
