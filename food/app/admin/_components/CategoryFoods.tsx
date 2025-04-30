"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category, Food } from "./Types";
import AddFoodCard from "./AddFoodCard";
import FoodCardList from "./FoodCardList";

interface CategoryFoodsProps {
  selectedCategory: string | null;
  categories: Category[];
  onClose: (value: boolean) => void;
}

const CategoryFoods = ({ selectedCategory, categories, onClose }: CategoryFoodsProps) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoods = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:3001/food?categoryId=${selectedCategory}`
        : `http://localhost:3001/food`; // selectedCategory байхгүй бол бүх хоолыг авна

      const response = await axios.get(url);
      setFoods(response.data.foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getFoods();
  }, [selectedCategory]);

  const selectedCat = categories.find((cat) => cat._id === selectedCategory);
  const categoryName = selectedCat?.categoryName || "Бүх хоол";

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
      <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
        {categoryName}
      </div>

      <div className="flex gap-[16px] flex-wrap">
        <AddFoodCard
          selectedCategoryName={categoryName}
          onClick={() => onClose(true)}
        />
        <FoodCardList foods={foods} />
      </div>
    </div>
  );
};

export default CategoryFoods;
