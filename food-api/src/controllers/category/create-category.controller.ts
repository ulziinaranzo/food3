import { Request, Response } from "express";
import { foodCategoryModel } from "../../models/food-category-model";

export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.body;

        await foodCategoryModel.create({
            categoryName,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.status(201).json({ message: "Added" });
    } catch(error) {
        return res.status(500).json({message: "Error creating category"})
    }
};
