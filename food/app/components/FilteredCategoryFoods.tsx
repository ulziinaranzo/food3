"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "../admin/_components/Types";
import { FoodCardHome } from "./FoodCardHome";
import { FoodCardCategories } from "./FoodCardCategories";

interface FilteredCategoryFoodsProps {
  onClose: (value: boolean) => void;
  categoryId: string;
  categoryName: string;
  selectedCategory: string;
}

export const FilteredCategoryFoods = ({
  onClose,
  categoryId,
  categoryName,
  selectedCategory,
}: FilteredCategoryFoodsProps) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFilteredFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      setFoods(response.data?.foodsByCategory || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getFilteredFoods();
    }
  }, [categoryId]);

  return (
    <div className="flex flex-col w-full h-fit p-[24px] px-[88px]">
      <div className="text-[30px] font-semibold text-white mb-[16px]">
        {categoryName}
      </div>

      <div className="gap-[36px] grid grid-cols-3">
        {foods?.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="flex flex-wrap">
              <FoodCardCategories items={food} />
            </div>
          ))
        ) : (
          <div>No foods available in this category</div>
        )}
      </div>
    </div>
  );
};
