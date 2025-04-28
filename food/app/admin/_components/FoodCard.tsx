import { EditIcon } from "@/app/assets/EditIcon";
import { useState } from "react";
import { EditFoodForm } from "./EditFoodForm";
import { Food } from "./Types";

type FoodCardProps = {
  image: string;
  name: string;
  price: number;
  ingredients: string;
  setEditFood: (value: boolean) => void;
  food: Food;
  handleEditClick: (food: Food) => void;
};

export default function FoodCard({
  image,
  name,
  price,
  ingredients,
  food,
}: FoodCardProps) {
  const [editFood, setEditFood] = useState<boolean>(false);
  const [foodToEdit, setFoodToEdit] = useState<Food | null>(null);
  return (
    <div className="flex flex-col p-4 gap-3 bg-white rounded-lg shadow-lg relative h-[241px] w-[250px]">
      <img
        src={image}
        alt={name}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />
      <button
        className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md"
        onClick={() => setEditFood(true)}
      >
        <EditIcon />
      </button>
      {editFood && (
        <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-50">
            <EditFoodForm
              setSelectedCategory={setSelectedCategory}
              onClose={() => {
                setEditFood(false);
              }}
              categories={categories}
              selectedCategory={selectedCategory}
              foodData={foodToEdit}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-[14px] font-[600]">
          <span className="text-[#EF4444]">{name}</span>
          <span className="text-[#09090B]">${price}</span>
        </div>
        <div className="text-[12px] font-[400] text-[#09090B] truncate">
          {ingredients}
        </div>
      </div>
    </div>
  );
}
