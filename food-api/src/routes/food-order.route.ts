import { Router } from "express";
import {
  getFoodOrderController,
  getFoodOrdersController,
  updateFoodOrderController,
  deleteFoodOrderController,
  createFoodOrderController,
  updateFoodOrderStatusController,
} from "../controllers/food-order/index";
import { authorizationMiddleware } from "../middlewares/authorization-middleware";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";

const foodOrderRouter = Router();

foodOrderRouter.get("/", authenticationMiddleware, getFoodOrdersController);
foodOrderRouter.get("/:id", authenticationMiddleware, getFoodOrderController);
foodOrderRouter.post("/", createFoodOrderController);
foodOrderRouter.put(
  "/:id",
  authenticationMiddleware,
  updateFoodOrderController
);
foodOrderRouter
  .delete(
    "/:id",
    authenticationMiddleware,
    authorizationMiddleware,
    deleteFoodOrderController
  )
  .put(
    "/:id/status",
    authenticationMiddleware,
    authorizationMiddleware,
    updateFoodOrderStatusController
  );

export default foodOrderRouter;
