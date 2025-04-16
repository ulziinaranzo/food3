import { Request, Response } from "express";
import { foodCategoryModel } from "../../models/food-category-model";

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const updatedCategory = await foodCategoryModel.findByIdAndUpdate(
            id,
            {
                categoryName,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: "Server error while updating category" });
    }
};
