import { useState } from "react";
import { Food } from "../admin/_components/Types";
import { AddIcon } from "../assets/AddIcon";
import { AddFoodToCart } from "./AddFoodToCart";

interface FoodCardHomeProps {
  categoryName: string;
  items: Food[];
}

export const FoodCardHome = ({ categoryName, items }: FoodCardHomeProps) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  return (
    <div className="flex flex-col">
      <div className="text-white font-[600] text-[30px] mb-6">
        {categoryName}
      </div>
      <div className="grid grid-cols-3 gap-[36px]">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col p-4 gap-5 bg-[#bebebe] rounded-lg shadow-lg relative w-[398px]"
          >
            {item.image?.[0] && (
              <img
                src={item.image?.[0]}
                alt={item.foodName}
                className="w-[365px] h-[210px] object-cover rounded-t-lg"
              />
            )}
            <button
              onClick={() => setSelectedFood(item)}
              className="w-[44px] h-[44px] flex items-center justify-center absolute right-[36px] top-[163px] bg-[white] z-10 rounded-full cursor-pointer"
            >
              <AddIcon />
            </button>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="font-[600] text-[24px] text-[#EF4444]">
                  {item.foodName}
                </div>
                <div className="font-[600] text-[18px] text-[black]">
                  {item.price}₮
                </div>
              </div>
              <div className="text-[14px] font-[500] text-[black] truncate">
                {item.ingredients}
              </div>
            </div>
            {selectedFood?._id === item._id && (
              <div className="absolute top-0 left-10 z-50 w-full h-full bg-opacity-60 flex justify-center items-center rounded-lg bg-white">
                <AddFoodToCart
                  food={selectedFood}
                  onClose={() => {
                    setSelectedFood(null);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
