"use client";
import { useState } from "react";
import { AddIcon } from "../assets/AddIcon";
import { Food } from "../admin/_components/Types";
import { AddFoodToCart } from "./AddFoodToCart";

type FoodCardProps = {
  items: Food;
};

export const FoodCardCategories = ({ items }: FoodCardProps) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (food: Food) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="flex flex-col p-4 gap-5 bg-[#bebebe] rounded-lg shadow-lg relative w-[398px]">
      <img
        src={items.image?.[0] ?? undefined}
        alt={items.foodName}
        className="w-[365px] h-[210px] object-cover rounded-t-lg"
      />

      <button
        className="w-[44px] h-[44px] flex items-center justify-center absolute right-[36px] top-[163px] bg-[white] z-10 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => handleOpenDialog(items)}
      >
        <AddIcon />
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[#EF4444] text-[24px] font-[600]">
            {items.foodName}
          </span>
          <span className="text-[black] text-[18px] font-[600]">
            {items.price}₮
          </span>
        </div>
        <div className="text-[14px] font-[500] text-[black] truncate">
          {items.ingredients}
        </div>
      </div>
      {selectedFood && (
        <AddFoodToCart
          open={isDialogOpen}
          onClose={handleCloseDialog}
          food={selectedFood}
        />
      )}
    </div>
  );
};
