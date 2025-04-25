"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import CategoryBadge from "../_components/CategoryBadge";
import FoodCard from "../_components/FoodCard";
import AddFoodCard from "../_components/AddFoodCard";
import { Category, Food } from "../_components/Types";
import { AddFoodForm } from "../_components/AddFoodForm";
import { AddCategory } from "../_components/AddCategory";
import { AllFoodGroups, CategoryWithFoods } from "../_components/AllFoodsGroup";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [onClose, setOnClose] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [foodGroupsButton, setFoodGroupsButton] = useState<boolean>(false);
  const [allFoodsByCategory, setAllFoodsByCategory] = useState<
    CategoryWithFoods[]
  >([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Категори авах үед алдаа гарлаа:", error);
    }
  };

  const getFoods = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      setFoods(response.data.foodsByCategory);
    } catch (error) {
      console.error("Хоол авах үед алдаа гарлаа", error);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setFoodGroupsButton(false);
    if (categoryId) {
      getFoods(categoryId);
    } else {
      const allFoods = allFoodsByCategory.flatMap((cat) => cat.foods);
      setFoods(allFoods);
    }
  };

  const handleAddFood = (newFood: Food) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col w-full bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B]">
            Хоолны категори
          </div>
          <CategoryBadge
            selectedCategory={selectedCategory}
            addCategory={setAddCategory}
            categories={categories}
            setSelectedCategory={handleCategorySelect}
          />
        </div>

        <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
            {selectedCategory
              ? categories.find((cat) => cat._id === selectedCategory)
                  ?.categoryName
              : "Бүх хоол"}
          </div>

          <div className="flex flex-wrap gap-[24px]">
            {foodGroupsButton && (
              <AllFoodGroups
                onLoad={(data) => {
                  setAllFoodsByCategory(data);
                  const allFoods = data.flatMap((cat) => cat.foods);
                  setFoods(allFoods);
                }}
              />
            )}

            {selectedCategory !== null && (
              <>
                <AddFoodCard
                  selectedCategoryName={
                    selectedCategory
                      ? categories.find((cat) => cat._id === selectedCategory)
                          ?.categoryName || ""
                      : ""
                  }
                  onClick={() => setOnClose(true)}
                />
                {foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    image={food.image?.[0]}
                    name={food.foodName}
                    ingredients={food.ingredients}
                    price={food.price}
                  />
                ))}
              </>
            )}
          </div>

          {onClose && (
            <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg z-50">
                <AddFoodForm
                  category={selectedCategory ?? ""}
                  onClose={() => setOnClose(false)}
                  categoryName={
                    selectedCategory
                      ? categories.find((cat) => cat._id === selectedCategory)
                          ?.categoryName || ""
                      : ""
                  }
                  onAddFood={handleAddFood}
                />
              </div>
            </div>
          )}

          {addCategory && (
            <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg z-50">
                <AddCategory
                  onClose={() => setAddCategory(false)}
                  addCategory={() => {
                    getCategories();
            import { PlusIcon } from "@/app/assets/PlusIcon";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryBadgeProps {
  selectedCategory: string | null;
  addCategory: (value: boolean) => void;
  categories: { _id: string; categoryName: string }[];
  setSelectedCategory: (value: string | null) => void;
  setFoodGroupsButton: (value: boolean) => void;
}

export default function CategoryBadge({
  selectedCategory,
  addCategory,
  categories,
  setSelectedCategory,
  setFoodGroupsButton,
}: CategoryBadgeProps) {
  const [foodCountByCategory, setFoodCountByCategory] = useState<
    Record<string, number>
  >({});
  const [totalFoodCount, setTotalFoodCount] = useState<number>(0);

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
      const { foodCount } = response.data;
      setTotalFoodCount(foodCount);
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
        <Badge
          onClick={() => {
            setSelectedCategory(null);
            setFoodGroupsButton(true);
          }}
          className={`px-[16px] py-[8px] text-[14px] font-[400] border-[1px] rounded-full cursor-pointer flex items-center
        ${
          selectedCategory === null
            ? "bg-[#EF4444] text-white"
            : "bg-white text-black hover:bg-[#EF4444] hover:text-white"
        } border-[#E4E4E7]`}
        >
          Бүх хоол
          <Badge className="ml-2 px-[10px] py-[2px] bg-[#18181B] text-white text-[12px] font-semibold rounded-full">
            {totalFoodCount}
          </Badge>
        </Badge>

        {categories.map((item) => (
          <Badge
            key={item._id}
            onClick={() => {
              setSelectedCategory(item._id);
              setFoodGroupsButton(false);
            }}
            className={`px-[16px] py-[8px] text-[14px] font-[400] border-[1px] rounded-full cursor-pointer flex items-center
        ${
          selectedCategory === item._id
            ? "bg-[#EF4444] text-white"
            : "bg-white text-black hover:bg-[#EF4444] hover:text-white"
        } border-[#E4E4E7]`}
          >
            {item.categoryName}
            <Badge className="ml-2 px-[10px] py-[2px] bg-[#18181B] text-white text-[12px] font-semibold rounded-full">
              {foodCountByCategory[item._id] ?? 0}
            </Badge>
          </Badge>
        ))}

        <button
          className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]"
          onClick={() => addCategory(true)}
        >
          <PlusIcon className="w-[16px] h-[16px]" />
        </button>
      </div>
    </div>
  );
}
        setAddCategory(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
