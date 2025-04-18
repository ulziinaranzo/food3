import express from "express";
import foodRouter from "./routes/food.route";
import categoryRouter from "./routes/category.route"; 
import { connectToDatabase } from "./database/connect-to-db";
import userRouter from "./routes/user.route";
import foodOrderRouter from "./routes/food-order.route";

connectToDatabase();

const app = express();
const port = 3001;

app.use(express.json());
app.use(foodRouter);
app.use(categoryRouter);
app.use(userRouter);
app.use("/food-order", foodOrderRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
