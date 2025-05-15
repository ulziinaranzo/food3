import express from "express";
import foodRouter from "../src/routes/food.route";
import categoryRouter from "../src/routes/category.route";
import { connectToDatabase } from "../src/database/connect-to-db";
import userRouter from "../src/routes/user.route";
import foodOrderRouter from "../src/routes/food-order.route";
import cors from "cors";
import { authRouter } from "../src/routes/auth.route";
import dotenv from "dotenv";

connectToDatabase();

const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(foodRouter);
app.use(categoryRouter);
app.use(userRouter);
app.use("/food-order", foodOrderRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
