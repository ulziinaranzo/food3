import { Request, Response } from "express";
import { foodCategoryModel } from "../../models/food-category-model";
import { foodModel } from "../../models/food-model";

export const deleteCategoryController = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedCategory = await foodCategoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({message: "Категори олдсонгүй"});
        }
        await foodModel.deleteMany({ category: id })

        return res.status(200).json({message: "Категори болон категорийн хоолнууд устлаа", category: deletedCategory});
    }
    catch (error) {
        return res.status(500).json({message: "Категори болон категорийн хоолнууд устахад алдаа гарлаа"})
    }
}