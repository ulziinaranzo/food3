import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category/index";
import { authorizationMiddleware } from "../middlewares/authorization-middleware";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";

const categoryRouter = Router();

categoryRouter
  .post("/category", authorizationMiddleware, authenticationMiddleware, createCategoryController)
  .get("/category", getCategoriesController)
  .put("/category/:id", authenticationMiddleware, authorizationMiddleware,  updateCategoryController)
  .delete("/category/:id",  authenticationMiddleware, authorizationMiddleware, deleteCategoryController);

export default categoryRouter;
