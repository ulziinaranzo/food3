import { Schema, model } from "mongoose";
 
const foodCategorySchema = new Schema({
    categoryName: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})
 
export const foodCategoryModel = model("foodCategory", foodCategorySchema)