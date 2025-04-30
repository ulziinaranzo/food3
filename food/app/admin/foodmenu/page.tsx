"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Category, Food } from "../_components/Types";
import { AddFoodForm } from "../_components/AddFoodForm";
import { AddCategory } from "../_components/AddCategory";
import CategoryList from "../_components/CategoryList";
import { AvatarBadge } from "../_components/AvatarBadge";
import CategoryFoods from "../_components/CategoryFoods";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [onClose, setOnClose] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);

  // 🔄 Категориудыг авах функц
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Категори авах үед алдаа гарлаа:", error);
    }
  };

  // ✅ Категори сонгох үед дуудагдана
  const handleCategorySelect = async (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    // Хэрвээ ангилал тусад нь татах шаардлагагүй бол энд дахин хүсэлт илгээх шаардлагагүй
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <AvatarBadge />
        </div>

        <div className="flex flex-col w-full bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B]">
            Хоолны категори
          </div>

          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addCategory={setAddCategory}
            handleCategorySelect={handleCategorySelect}
          />
        </div>

        {selectedCategory && (
        <CategoryFoods
          selectedCategory={selectedCategory}
          categories={categories}
          foods={foods}
          onClose={setOnClose}
        />
      )}
      </div>

      {/* ➕ Хоол нэмэх форм */}
      {onClose && (
        <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-50">
            <AddFoodForm
              category={selectedCategory ?? ""}
              onClose={() => setOnClose(false)}
              categoryName={
                selectedCategory
                  ? categories.find((cat) => cat._id === selectedCategory)?.categoryName || ""
                  : ""
              }
            />
          </div>
        </div>
      )}

      {/* ➕ Категори нэмэх форм */}
      {addCategory && (
        <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-50">
            <AddCategory
              onClose={() => setAddCategory(false)}
              addCategory={() => {
                getCategories();
                setAddCategory(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


// <div className="flex flex-col ">
// <div className="flex flex-wrap ">
  

// {onClose && (
//   <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-lg z-50">
//       <AddFoodForm
//         category={selectedCategory ?? ""}
//         onClose={() => setOnClose(false)}
//         categoryName={
//           selectedCategory
//             ? categories.find((cat) => cat._id === selectedCategory)
//                 ?.categoryName || ""
//             : ""
//         }
//       />
//     </div>
//   </div>
// )}

// {addCategory && (
//   <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-lg z-50">
//       <AddCategory
//         onClose={() => setAddCategory(false)}
//         addCategory={() => {
//           getCategories();
//           setAddCategory(false);
//         }}
//       />
//     </div>
//   </div>
// )}
// </div>
// </div>