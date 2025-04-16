import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";


export const createFoodController: RequestHandler = async ( req, res) => {
    try {
        const { foodName, price, image, category, ingredients, createdAt, updatedAt} = req.body;
        await foodModel.create({
            foodName,
            price,
            image,
            createdAt: new Date(),
            updatedAt: new Date(),
            category,
            ingredients,
        })
        return res.status(201).json({message: "Added"})
    } catch(error) {
        return res.status(500).json({message: "Error creating food"})
    }
}