"use client";
import { PlusIcon } from "@/app/assets/PlusIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryBadge from "./CategoryBadge";
import { AddCategory } from "./AddCategory";

interface CategoryListProps {
  selectedCategory: string | null;
  categories: { _id: string; categoryName: string }[];
  handleCategorySelect: (value: string) => void;
}

export default function CategoryList({
  selectedCategory,
  categories,
  handleCategorySelect,
}: CategoryListProps) {
  const [foodCountByCategory, setFoodCountByCategory] = useState<
    Record<string, number>
  >({});
  const [totalFoodCount, setTotalFoodCount] = useState<number>(0);
  const [addCategory, setAddCategory] = useState<boolean>(false);

  const getFoodCountByCategory = async () => {
    try {
      const promises = categories.map(async (category) => {
        const response = await axios.get(
          `http://localhost:3001/count/${category._id}`
        );
        return { id: category._id, count: response.data.foodCount };
      });

      const results = await Promise.all(promises);
      const countMap: Record<string, number> = {};
      results.forEach(({ id, count }) => {
        countMap[id] = count;
      });

      setFoodCountByCategory(countMap);
    } catch (error) {
      console.error("Category count fetch алдаа гарлаа", error);
    }
  };

  const getAllFoodCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/count/`);
      setTotalFoodCount(response.data.totalFoods);
    } catch (error) {
      console.error("Нийт хоолны тоо авах үед алдаа гарлаа", error);
    }
  };

  useEffect(() => {
    getAllFoodCount();
    getFoodCountByCategory();
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-[12px] mt-[16px]">
        <CategoryBadge
          label="Бүх хоол"
          count={totalFoodCount}
          isActive={selectedCategory === ""}
          onClick={() => {
            handleCategorySelect("");
          }}
        />

        {categories.map((item) => (
          <CategoryBadge
            key={item._id}
            label={item.categoryName}
            count={foodCountByCategory[item._id] ?? 0}
            isActive={selectedCategory === item._id}
            onClick={() => handleCategorySelect(item._id)}
          />
        ))}

        {/* <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
          <div className="w-[16px] h-[16px]" onclick={setAddCategory(true)}>
            <PlusIcon />
          </div>
          {addCategory && <AddCategory onClose={() => }/>}
        </button> */}
      </div>
    </div>
  );
}
