"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddFoodCard from "../_components/AddFoodCard";
import { AllCategory, Category, Food } from "../_components/Types";
import { AddFoodForm } from "../_components/AddFoodForm";
import { AddCategory } from "../_components/AddCategory";
import CategoryList from "../_components/CategoryList";
import { AvatarBadge } from "../_components/AvatarBadge";
import { AllFoodGroups } from "../_components/AllFoodsGroup";
import { CategoryFoods } from "../_components/CategoryFoods";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [onClose, setOnClose] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [allFoodsByCategory, setAllFoodsByCategory] = useState<AllCategory[]>(
    []
  );

  const getAllFoodsByCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/food/grouped-by-category"
      );
      setAllFoodsByCategory(response.data.data);
    } catch (error) {
      console.error("Grouped хоолнууд авах үед алдаа:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      const cats = response.data.categories;
      setCategories(cats);
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
    if (categoryId) {
      getFoods(categoryId);
    } else {
      const allFoods = allFoodsByCategory.flatMap((cat) => cat.foods);
      setFoods(allFoods);
      console.log("allfoods");
    }
  };

  useEffect(() => {
    getCategories();
    getAllFoodsByCategory();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <AvatarBadge />
        </div>
        <div className="flex flex-col w-full bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B]">
            Хоолны категори
          </div>
          <CategoryList
            selectedCategory={selectedCategory}
            addCategory={setAddCategory}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            handleCategorySelect={handleCategorySelect}
          />
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-wrap ">
            {selectedCategory === null ? (
              <AllFoodGroups
                setSelectedCategory={setSelectedCategory}
                onClose={setOnClose}
              />
            ) : (
              <CategoryFoods
                selectedCategory={selectedCategory}
                categories={categories}
                onClose={setOnClose}
                foods={foods}
              />
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
