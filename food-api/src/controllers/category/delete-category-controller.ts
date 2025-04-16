import { Request, Response } from "express";
import { foodCategoryModel } from "../../models/food-category-model";

export const deleteCategoryController = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await foodCategoryModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json({message: "Category deleted", category: deleted});
    }
    catch (error) {
        return res.status(500).json({message: "Error deleting category"})
    }
}