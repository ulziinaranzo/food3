"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "../admin/_components/Types";
import { FoodCardHome } from "./FoodCardHome";
import { api } from "@/axios";

type CategorySectionProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategorySection = ({ onClose }: CategorySectionProps) => {
  const [foodsByCategory, setFoodsByCategory] = useState<
    Record<string, Food[]>
  >({});
  const getFoods = async () => {
    try {
      const response = await api.get(`/grouped-by-category`);
      const grouped: Record<string, Food[]> = {};

      response.data.data.forEach(
        (group: { category: { categoryName: string }; foods: Food[] }) => {
          const categoryName = group.category.categoryName;
          grouped[categoryName] = group.foods;
        }
      );

      setFoodsByCategory(grouped);
    } catch (error) {
      console.error("Хоол харуулахад алдаа гарлаа", error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col px-[88px] pb-[54px] pt-[54px] gap-[54px] ">
      {Object.entries(foodsByCategory).map(([categoryName, items]) => (
        <FoodCardHome
          key={categoryName}
          categoryName={categoryName}
          items={items}
        />
      ))}
    </div>
  );
};
