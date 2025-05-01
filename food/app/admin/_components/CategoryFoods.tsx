"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Food } from "./Types";
import AddFoodCard from "./AddFoodCard";
import { FoodCard } from "./FoodCard";

interface CategoryFoodsProps {
  onClose: (value: boolean) => void;
  categoryId: string;
  categoryName: string;
}

const CategoryFoods = ({
  onClose,
  categoryId,
  categoryName,
}: CategoryFoodsProps) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      setFoods(response.data?.foodsByCategory);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
      <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
        {categoryName}
      </div>

      <div className="flex gap-[16px] flex-wrap">
        <AddFoodCard
          selectedCategoryName={categoryName}
          categoryId={categoryId}
        />

        {foods?.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard food={food} selectedCategory={categoryId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFoods;
