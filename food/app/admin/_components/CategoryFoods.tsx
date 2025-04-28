"use client"

import { Category, CategoryWithFoods, Food } from "./Types";
import AddFoodCard from "./AddFoodCard";

import { FoodCardList } from "./FoodCardList";

interface CategoryFoodsProps {
    onClose: (value: boolean) => void;
    selectedCategory: string;
    categories: Category[];
    foods: Food[]
}
export const CategoryFoods = ({ selectedCategory, categories, onClose, foods }: CategoryFoodsProps) => {
    return (
        <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
                  <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
            {categories.find((cat) => cat._id === selectedCategory)?.categoryName}
          </div>
          <div className="flex gap-[16px]">
          <AddFoodCard 
          selectedCategoryName={categories.find((cat) => cat._id === selectedCategory)?.categoryName || ""}
          onClick={()=> onClose(true)}
          />
            <FoodCardList foods={foods}
            />
            </div>
        </div>
    )
}