"use client";
import { Categories } from "./Categories";
import { CategorySection } from "./CategorySection";

export const HomePage = ({ foods, categories }) => {
  // Group foods by category
  const groupedFoods = categories.map((category) => {
    const foodsInCategory = foods.filter(
      (food) => food.category._id === category._id
    );
    return {
      categoryName: category.categoryName,
      foods: foodsInCategory,
    };
  });

  return (
    <div className="bg-black h-fit w-full ">
      <Categories />
      {groupedFoods.map((group, index) => (
        <CategorySection
          key={index}
          category={group.categoryName} // Pass category name to display
          foods={group.foods} // Pass foods corresponding to each category
        />
      ))}
    </div>
  );
};
