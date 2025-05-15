"use client";
import React from "react";
import { Food, Category } from "./Types";
import { FoodCard } from "./FoodCard";

interface FoodCardListProps {
  foods: Food[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  refreshFoods: () => void;
}

const FoodCardList = ({
  foods,
  categories,
  selectedCategory,
  setSelectedCategory,
  refreshFoods,
}: FoodCardListProps) => {
  if (!foods || !Array.isArray(foods)) {
    return <div>Хоол ачааллаж байна...</div>;
  }

  if (foods.length === 0) {
    return <div>Хоол олдсонгүй.</div>;
  }

  return (
    <>
      {foods.map((food) => (
        <FoodCard
          key={food._id}
          food={food}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onUpdate={refreshFoods}
          category={food.category ?? ""}
        />
      ))}
    </>
  );
};

export default FoodCardList;
