
import { Router } from "express";
import { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController } from "../controllers/category/index";


const categoryRouter = Router();

categoryRouter
    .post("/category", createCategoryController)
    .get("/category", getCategoriesController)
    .put("/category/:id", updateCategoryController)
    .delete("/category/:id", deleteCategoryController);

export default categoryRouter;
