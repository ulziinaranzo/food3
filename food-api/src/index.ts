import  express from "express"
import foodRouter from "./routes/food.route";
import { connectToDatabase } from "./database/connect-to-db";

connectToDatabase()

const app = express();

const port = 3001;

app.use(foodRouter)

app.listen(port, () => {
    console.log("Example app listening on port ${port}")
})