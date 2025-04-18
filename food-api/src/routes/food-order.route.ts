import { Router } from "express";
import { 
  getFoodOrderController, 
  getFoodOrdersController, 
  updateFoodOrderController, 
  deleteFoodOrderController, 
  createFoodOrderController 
} from "../controllers/food-order/index";

const foodOrderRouter = Router();

foodOrderRouter.get("/", getFoodOrdersController);
foodOrderRouter.get("/:id", getFoodOrderController);
foodOrderRouter.post("/", createFoodOrderController);
foodOrderRouter.put("/:id", updateFoodOrderController);
foodOrderRouter.delete("/:id", deleteFoodOrderController);

export default foodOrderRouter;
