import React from "react";
import { Food, Category } from "./Types";
import FoodCard from "./FoodCard";

interface FoodCardListProps {
  foods: Food[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
}

const FoodCardList = ({
  foods,
  categories,
  selectedCategory,
  setSelectedCategory,
}: FoodCardListProps) => {
  return (
    <div className="flex flex-wrap gap-[24px]">
      {foods.map((food) => (
        <FoodCard
          key={food._id}
          food={food}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};

export default FoodCardList;
