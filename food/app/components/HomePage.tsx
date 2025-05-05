"use client";
import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { CategorySection } from "./CategorySection";
import axios from "axios";
import { Category } from "../admin/_components/Types";
import { FilteredCategoryFoods } from "./FilteredCategoryFoods";
import { OrderDetail } from "./OrderDetail";

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onClose, setOnClose] = useState<boolean>(false);
  const [filteredCategories, setFilteredCategories] = useState<boolean>(false);
  const [isOrder, setIsOrder] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Категори авах үед алдаа гарлаа:", error);
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilteredCategories(true);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filteredCategory = categories.filter((item) => {
    if (selectedCategory == "") {
      return item;
    } else {
      return item._id == selectedCategory;
    }
  });
  return (
    <div className="bg-[black] h-fit w-full">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        setFilteredCategories={setFilteredCategories}
      />

      {filteredCategories && filteredCategory.length > 0 ? (
        filteredCategory.map((item) => (
          <div key={item._id}>
            <FilteredCategoryFoods
              categoryId={item._id}
              categoryName={item.categoryName}
              onClose={setOnClose}
              selectedCategory={selectedCategory}
            />
          </div>
        ))
      ) : (
        <CategorySection onClose={setOnClose} />
      )}
    </div>
  );
};
