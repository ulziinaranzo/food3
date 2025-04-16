
import { Router } from "express";
import { createCategoryController } from "../controllers/category/create-category.controller";
import { getCategoriesController } from "../controllers/category/get-category-contoller";
import { updateCategoryController } from "../controllers/category/update-category-controller";
import { deleteCategoryController } from "../controllers/category/delete-category-controller";


const categoryRouter = Router();

categoryRouter
    .post("/category", createCategoryController)
    .get("/category", getCategoriesController)
    .put("/category/:id", updateCategoryController)
    .delete("/category/:id", deleteCategoryController);

export default categoryRouter;
