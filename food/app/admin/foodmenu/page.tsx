"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../_components/Types";
import CategoryList from "../_components/CategoryList";
import { AvatarBadge } from "../_components/AvatarBadge";
import CategoryFoods from "../_components/CategoryFoods";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onClose, setOnClose] = useState<boolean>(false);

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
            handleCategorySelect={handleCategorySelect}
          />
        </div>
        {filteredCategory.map((item, index) => {
          return (
            <div key={item._id}>
              <CategoryFoods
                onClose={setOnClose}
                categoryName={item.categoryName}
                categoryId={item._id}
              />
            </div>
          );
        })}
      </div>

      {/* {onClose && (
        <div className="fixed inset-0 bg-gray bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg z-50">
            <AddFoodForm
              category={selectedCategory ?? ""}
              onClose={() => setOnClose(false)}
              categoryName={
                selectedCategory
                  ? categories.find((cat) => cat._id === selectedCategory)
                      ?.categoryName || ""
                  : ""
              }
            />
          </div>
        </div>
      )} */}

      {/* {addCategory && (
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
      )} */}
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
