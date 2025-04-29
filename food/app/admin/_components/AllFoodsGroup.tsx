"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./FoodCard";
import AddFoodCard from "./AddFoodCard";

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
  onClose: (value: boolean) => void;
  setSelectedCategory: (value: string) => void;
}
export const AllFoodGroups = ({
  setSelectedCategory,
  onClose,
}: AllFoodGroupsProps) => {
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

  const handleEditClick = (food: Food) => {
    setFoodToEdit(food);
    setEditFood(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-fit">
      {allFoodGroups.map((group) => (
        <div
          key={group.category._id}
          className="flex gap-[24px]  bg-white rounded-lg p-[24px]"
        >
          <div
            key={group.category._id}
            className="text-[20px] font-semibold text-[#09090B] mb-[16px]"
          >
            <h2 className="text-xl font-bold mb-2">
              {group.category.categoryName}
            </h2>
            <div className="flex flex-wrap gap-4">
              <AddFoodCard
                selectedCategoryName={group.category.categoryName}
                onClick={() => onClose(true)}
              />
              {group.foods.map((food) => (
                <FoodCard
                key={food._id}
                image={food.image}
                name={food.name}
                ingredients={food.ingredients}
                price={food.price}
                food={food}
                selectedCategory={group.category._id}
                setSelectedCategory={setSelectedCategory}
                categories={allFoodGroups.map((g) => ({
                  _id: g.category._id,
                  categoryName: g.category.categoryName,
                }))}
              />
              
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
