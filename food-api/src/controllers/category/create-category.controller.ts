import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/food-category-model";

export const createCategoryController = async ( req, res) => {
    const { categoryName } = req.body;
    await foodCategoryModel.create({
        categoryName,
        createAt: new Date(),
        updatedAt: new Date()
    })
    return res.status(200).json({message: "Added"})
}