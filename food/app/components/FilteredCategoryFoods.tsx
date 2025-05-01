"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "../admin/_components/Types";
import { FoodCardHome } from "./FoodCardHome";

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
      setFoods(response.data?.foodsByCategory || []); // Default to an empty array if no data
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getFilteredFoods();
  }, [categoryId]); // Fetch foods again when categoryId changes

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
      <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
        {categoryName}
      </div>

      <div className="flex gap-[16px] flex-wrap">
        {/* Pass the foods array to FoodCardHome */}
        {foods?.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="grid grid-cols-4">
              <FoodCardHome items={[food]} categoryName={categoryName} />
            </div>
          ))
        ) : (
          <div>No foods available in this category</div>
        )}
      </div>
    </div>
  );
};
