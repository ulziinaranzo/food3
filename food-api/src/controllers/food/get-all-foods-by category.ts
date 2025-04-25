import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/food-category-model";
import { foodModel } from "../../models/food-model";

// Энэ код зөв бөгөөд ажиллах боломжтой.
export const getFoodsGroupedByCategory: RequestHandler = async (req, res) => {
    try {
      const categories = await foodCategoryModel.find();
  
      const data = await Promise.all(
        categories.map(async (category) => {
          const foods = await foodModel
            .find({ category: category._id })
            .populate("category");
  
          return {
            category: {
              _id: category._id,
              categoryName: category.categoryName,
            },
            foods,
          };
        })
      );
  
      res.status(200).json({ message: "Foods grouped by category", data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching foods", error });
    }
  };
  