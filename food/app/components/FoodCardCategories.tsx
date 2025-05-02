"use client";
import { EditIcon } from "@/app/assets/EditIcon";
import { useState } from "react";
import { Category, Food } from "./Types";
import { EditFoodForm } from "./EditFoodForm";
import { AddIcon } from "../assets/AddIcon";

type FoodCardProps = {
  items: Food;
};

export const FoodCardCategories = ({ items }: FoodCardProps) => {
  const [addCartFood, setAddCartFood] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<Food>(items);

  return (
    <div className="flex flex-col p-4 gap-5 bg-[#6f6f6f] rounded-lg shadow-lg relative ">
      <img
        src={items.image?.[0] ?? undefined}
        alt={items.foodName}
        className="w-[365px] h-[210px] object-cover rounded-t-lg"
      />
      <button
        className="w-[44px] h-[44px] flex items-center justify-center absolute right-[36px] top-[163px] bg-[white] z-10 rounded-full shadow-md cursor-pointer"
        onClick={() => setAddCartFood(true)}
      >
        <AddIcon />
      </button>
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between items-center  ">
          <span className="text-[#EF4444] text-[24px]">{items.foodName}</span>
          <span className="text-[white] text-[18px] font-[600]">
            {items.price}₮
          </span>
        </div>
        <div className="text-[14px] font-[400] text-[white] truncate">
          {items.ingredients}
        </div>
      </div>
    </div>
  );
};
