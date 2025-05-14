"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../_components/Types";
import CategoryList from "../_components/CategoryList";
import { AvatarBadge } from "../_components/AvatarBadge";
import CategoryFoods from "../_components/CategoryFoods";
import { SelectCategory } from "../_components/SelectCategory";
import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onClose, setOnClose] = useState<boolean>(false);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signup");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-bold text-[30px] flex justify-center mt-[100px] text-black">
        ERROR...404
      </div>
    );
  }

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
            refreshCategories={getCategories}
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
    </div>
  );
}
