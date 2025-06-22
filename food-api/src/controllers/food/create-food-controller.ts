import { RequestHandler } from "express";
import { foodModel } from "../../models/food-model";

export const createFoodController: RequestHandler = async (req, res) => {
  try {
    const { foodName, price, image, category, ingredients } = req.body;

    if (!foodName || !price || !image || !category || !ingredients) {
      res.status(400).json({ message: "Бүх талбаруудыг бөглөнө үү" });
      return;
    }

    const priceNum = typeof price === "string" ? Number(price) : price;
    if (isNaN(priceNum)) {
      res.status(400).json({ message: "Үнэ буруу байна" });
      return;
    }

    const imagesArray = Array.isArray(image) ? image : [image];

    const newFood = await foodModel.create({
      foodName,
      price: priceNum,
      image: imagesArray,
      category,
      ingredients,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Амжилттай нэмэгдлээ", food: newFood });
    return;
  } catch (error) {
    console.error("Create food error:", error);
    res.status(500).json({ message: "Хоол үүсгэхэд алдаа гарлаа" });
    return;
  }
};
