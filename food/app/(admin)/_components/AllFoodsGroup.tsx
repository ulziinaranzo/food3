"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";

interface Food {
  _id: string;
  name: string;
  image: string;
  price: number;
  ingredients: string;
}

export interface CategoryWithFoods {
  category: {
    _id: string;
    categoryName: string;
  };
  foods: Food[];
}

interface AllFoodGroupsProps {
  onLoad?: (data: CategoryWithFoods[]) => void;
}

export const AllFoodGroups = ({ onLoad }: AllFoodGroupsProps) => {
  const [allFoodGroups, setAllFoodGroups] = useState<CategoryWithFoods[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllFoodGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/grouped-by-category"
      );
      const data = response.data.data;
      setAllFoodGroups(data);
      console.log("dasdf", data);
      if (onLoad) {
        onLoad(data);
      }
    } catch (error) {
      console.error("Error fetching food groups:", error);
      setError("Failed to load food groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFoodGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {allFoodGroups.map((group) => (
        <div
          key={group.category._id}
          className="text-[20px] font-semibold text-[#09090B] mb-[16px]"
        >
          <h2 className="text-xl font-bold mb-2">
            {group.category.categoryName}
          </h2>
          <div className="flex flex-wrap gap-4">
            {group.foods.map((food) => (
              <div
                key={food._id}
                className="flex flex-col p-4 gap-3 bg-white rounded-lg shadow-lg relative h-[241px] w-[250px]"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-[150px] object-cover rounded-t-lg"
                />
                <button className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md">
                  <Pencil size={16} color="red" />
                </button>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[14px] font-[600]">
                    <span className="text-[#EF4444]">{food.name}</span>
                    <span className="text-[#09090B]">${food.price}</span>
                  </div>
                  <div className="text-[12px] font-[400] text-[#09090B] truncate">
                    {food.ingredients}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
