"use client";

import { useState } from "react";
import FoodCard from "./FoodCard";
import { Food } from "./Types";

interface FoodCardListProps {
  foods: Food[];
}
export const FoodCardList = ({ foods }: FoodCardListProps) => {
  const [editFood, setEditFood] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap gap-[24px]">
      {foods.map((food) => (
        <FoodCard
          key={food._id}
          image={food.image?.[0]}
          name={food.foodName}
          ingredients={food.ingredients}
          price={food.price}
          setEditFood={setEditFood}
        />
      ))}
    </div>
  );
};
