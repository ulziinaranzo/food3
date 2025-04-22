import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "foodCategory",
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

export const foodModel = model("food", foodSchema);
