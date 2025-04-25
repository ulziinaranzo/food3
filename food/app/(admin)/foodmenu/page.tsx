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
import { Types } from "../_components/Types";
import { AddCategory } from "../_components/AddCategory";

// AllCategory type
type AllCategory = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodCountByCategory, setFoodCountByCategory] = useState<Record<string, number>>({});
  const [totalFoodCount, setTotalFoodCount] = useState<number>(0);
  const [onClose, setOnClose] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [allFoodsByCategory, setAllFoodsByCategory] = useState<AllCategory[]>([]);

  const getFoodCountByCategory = async (categoryId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/food/count/${categoryId}`);
      const { foodCount } = response.data;
      setFoodCountByCategory((prev) => ({
        ...prev,
        [categoryId]: foodCount,
      }));
    } catch (error) {
      console.error("Category count fetch алдаа гарлаа", error);
    }
  };

  const getAllFoodsByCategory = async () => {
    try {
      const response = await axios.get("http://localhost:3001/food/grouped-by-category");
      setAllFoodsByCategory(response.data.data);
    } catch (error) {
      console.error("Grouped хоолнууд авах үед алдаа:", error);
    }
  };

  const getAllFoodCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/food/count`);
      const { foodCount } = response.data;
      setTotalFoodCount(foodCount);
    } catch (error) {
      console.error("Нийт хоолны тоо авах үед алдаа гарлаа", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      const cats = response.data.categories;
      setCategories(cats);

      cats.forEach((cat: Category) => {
        getFoodCountByCategory(cat._id);
      });
    } catch (error) {
      console.error("Категори авах үед алдаа гарлаа:", error);
    }
  };

  const getFoods = async (categoryId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/food?categoryId=${categoryId}`);
      setFoods(response.data.foodsByCategory);
    } catch (error) {
      console.error("Хоол авах үед алдаа гарлаа", error);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      getFoods(categoryId);
    } else {
      const allFoods = allFoodsByCategory.flatMap((cat) => cat.foods);
      setFoods(allFoods);
    }
  };

  useEffect(() => {
    getAllFoodCount();
    getCategories();
    getAllFoodsByCategory();
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
          <div className="text-[20px] font-semibold text-[#09090B]">Хоолны категори</div>
          <div className="flex flex-wrap gap-[12px] mt-[16px]">
            <CategoryBadge
              label="Бүх хоол"
              count={totalFoodCount}
              isActive={selectedCategory === null}
              onClick={() => handleCategorySelect(null)}
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
            <button
              className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]"
              onClick={() => setAddCategory(true)}
            >
              <PlusIcon className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
            {selectedCategory
              ? categories.find((cat) => cat._id === selectedCategory)?.categoryName
              : "Бүх хоол"}
          </div>

          <div className="flex flex-wrap gap-[24px]">
            <AddFoodCard
              selectedCategoryName={
                selectedCategory
                  ? categories.find((cat) => cat._id === selectedCategory)?.categoryName || ""
                  : null
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
          </div>

          {onClose && (
            <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg z-50">
                <AddFoodForm
                  category={selectedCategory ?? ""}
                  onClose={() => setOnClose(false)}
                  categoryName={
                    selectedCategory
                      ? categories.find((cat) => cat._id === selectedCategory)?.categoryName || ""
                      : ""
                  }
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
