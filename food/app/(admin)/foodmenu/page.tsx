"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import CategoryBadge from "../_components/CategoryBadge";
import FoodCard from "../_components/FoodCard";
import AddFoodCard from "../_components/AddFoodCard";

export default function Home() {
  type Food = {
    _id: string;
    foodName: string;
    image: string[];
    price: number;
    ingredients: string;
  };

  type Category = {
    _id: string;
    categoryName: string;
    foods?: Food[];
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodCountByCategory, setFoodCountByCategory] = useState<Record<string, number>>({});
  const [totalFoodCount, setTotalFoodCount] = useState<number>(0);

  const getFoodCountByCategory = async (categoryId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/food/count/${categoryId}`);
      console.log(`CategoryID: ${categoryId}, Count Response:`, response.data);
      const { foodCount } = response.data;
      setFoodCountByCategory((prev) => ({
        ...prev,
        [categoryId]: foodCount,
      }));
    } catch (error) {
      console.error("Category count fetch алдаа гарлаа", error);
    }
  };

  const getAllFoodCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/food/count`);
      console.log("Total food count response:", response.data);
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
      console.log("Categories from API:", cats);
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
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      console.log("Foods by category response:", response.data.foodsByCategory);
      setFoods(response.data.foodsByCategory);
    } catch (error) {
      console.error("Хоол авах үед алдаа гарлаа", error);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) getFoods(categoryId);
  };

  useEffect(() => {
    getAllFoodCount();
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
            <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
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
            <AddFoodCard selectedCategoryName={selectedCategory ? categories.find((cat) => cat._id === selectedCategory)?.categoryName : null}
            onClick={() => {
              console.log("Хоол нэмэх товч дарагдлаа")
            }}
{foods.map((food, index) => (
  <FoodCard 
  key={food._id}
  image={food.image?.[0]}
  name={food.foodName}
  ingredients={food.ingredients}
  price={food.price}
  />
))}
          </div>
        </div>
      </div>
    </div>
  );
}
