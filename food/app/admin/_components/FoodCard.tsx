import { EditIcon } from "@/app/assets/EditIcon";
import { useState } from "react";
import { EditFoodForm } from "./EditFoodForm";
import { Category, Food } from "./Types";

type FoodCardProps = {
  food: Food;
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
};

export default function FoodCard({
  food,
  categories,
  selectedCategory,
  setSelectedCategory,
}: FoodCardProps) {
  const [editFood, setEditFood] = useState<boolean>(false);
  const [foodToEdit, setFoodToEdit] = useState<Food | null>(null);

  const handleEditClick = () => {
    setFoodToEdit(food);
    setEditFood(true);
  };

  return (
    <div className="flex flex-col p-4 gap-3 bg-white rounded-lg shadow-lg relative h-[241px] w-[250px]">
      <img
        src={food.image?.[0]}
        alt={food.foodName}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />
      <button
        className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md"
        onClick={handleEditClick}
      >
        <EditIcon />
      </button>

      {editFood && foodToEdit && (
        <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-50">
            <EditFoodForm
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              categories={categories}
              onClose={() => setEditFood(false)}
              foodData={foodToEdit}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-[14px] font-[600]">
          <span className="text-[#EF4444]">{food.foodName}</span>
          <span className="text-[#09090B]">${food.price}</span>
        </div>
        <div className="text-[12px] font-[400] text-[#09090B] truncate">
          {food.ingredients}
        </div>
      </div>
    </div>
  );
}
