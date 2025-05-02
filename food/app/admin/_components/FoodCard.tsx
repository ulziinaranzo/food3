"use client";
import { EditIcon } from "@/app/assets/EditIcon";
import { useState } from "react";
import { Category, Food } from "./Types";
import { EditFoodForm } from "./EditFoodForm";

type FoodCardProps = {
  food: Food;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categoryId: string;
  onDelete: (id: string) => void
  onUpdate: () => void;
};
type foodData = {
  food: Food[];
  categories: Category[];
};
export const FoodCard = ({
  food,
  categories,
  selectedCategory,
  setSelectedCategory,
  onDelete,
  categoryId,
}: FoodCardProps) => {
  const [editFood, setEditFood] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<Food>(food);

  const handleUpdateFood = () => {
    setCurrentFood(currentFood);
    setEditFood(false);
  };
  const handleDelete = () => {
    onDelete(food._id)
  }
  return (
    <div className="flex flex-col p-4 gap-3 bg-white rounded-lg shadow-lg relative h-[241px] w-[250px]">
      <img
        src={food.image?.[0] ?? undefined}
        alt={food.foodName}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />
      <button
        className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md"
        onClick={() => setEditFood(true)}
      >
        <EditIcon />
      </button>

      {editFood && (
        <EditFoodForm
          setSelectedCategory={setSelectedCategory}
          selectedCategory={categoryId}
          categories={categories}
          foodData={currentFood}
          onUpdate={handleUpdateFood}
          onClose={() => setEditFood(false)}
          categoryName={food.category}
          onDelete={onDelete}
        />
      )}

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-[14px] font-[600]">
          <span className="text-[#EF4444]">{food.foodName}</span>
          <span className="text-[#09090B]">{food.price}₮</span>
        </div>
        <div className="text-[12px] font-[400] text-[#09090B] truncate">
          {food.ingredients}
        </div>
      </div>
    </div>
  );
};
