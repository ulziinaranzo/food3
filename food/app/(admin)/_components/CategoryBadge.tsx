import { PlusIcon } from "@/app/assets/PlusIcon";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryBadgeProps {
  selectedCategory: string | null;
  addCategory: (value: boolean) => void;
  categories: { _id: string; categoryName: string }[];
  setSelectedCategory: (value: string | null) => void;
  setFoodGroupsButton: (value: boolean) => void;
}

export default function CategoryBadge({
  selectedCategory,
  addCategory,
  categories,
  setSelectedCategory,
  setFoodGroupsButton,
}: CategoryBadgeProps) {
  const [foodCountByCategory, setFoodCountByCategory] = useState<
    Record<string, number>
  >({});
  const [totalFoodCount, setTotalFoodCount] = useState<number>(0);

  const getFoodCountByCategory = async () => {
    try {
      const promises = categories.map(async (category) => {
        const response = await axios.get(
          `http://localhost:3001/count/${category._id}`
        );
        return { id: category._id, count: response.data.foodCount };
      });

      const results = await Promise.all(promises);
      const countMap: Record<string, number> = {};
      results.forEach(({ id, count }) => {
        countMap[id] = count;
      });

      setFoodCountByCategory(countMap);
    } catch (error) {
      console.error("Category count fetch алдаа гарлаа", error);
    }
  };

  const getAllFoodCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/count/`);
      const { foodCount } = response.data;
      setTotalFoodCount(foodCount);
    } catch (error) {
      console.error("Нийт хоолны тоо авах үед алдаа гарлаа", error);
    }
  };

  useEffect(() => {
    getAllFoodCount();
    getFoodCountByCategory();
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-[12px] mt-[16px]">
        <Badge
          onClick={() => {
            setSelectedCategory(null);
            setFoodGroupsButton(true);
          }}
          className={`px-[16px] py-[8px] text-[14px] font-[400] border-[1px] rounded-full cursor-pointer flex items-center
        ${
          selectedCategory === null
            ? "bg-[#EF4444] text-white"
            : "bg-white text-black hover:bg-[#EF4444] hover:text-white"
        } border-[#E4E4E7]`}
        >
          Бүх хоол
          <Badge className="ml-2 px-[10px] py-[2px] bg-[#18181B] text-white text-[12px] font-semibold rounded-full">
            {totalFoodCount}
          </Badge>
        </Badge>

        {categories.map((item) => (
          <Badge
            key={item._id}
            onClick={() => {
              setSelectedCategory(item._id);
              setFoodGroupsButton(false);
            }}
            className={`px-[16px] py-[8px] text-[14px] font-[400] border-[1px] rounded-full cursor-pointer flex items-center
        ${
          selectedCategory === item._id
            ? "bg-[#EF4444] text-white"
            : "bg-white text-black hover:bg-[#EF4444] hover:text-white"
        } border-[#E4E4E7]`}
          >
            {item.categoryName}
            <Badge className="ml-2 px-[10px] py-[2px] bg-[#18181B] text-white text-[12px] font-semibold rounded-full">
              {foodCountByCategory[item._id] ?? 0}
            </Badge>
          </Badge>
        ))}

        <button
          className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]"
          onClick={() => addCategory(true)}
        >
          <PlusIcon className="w-[16px] h-[16px]" />
        </button>
      </div>
    </div>
  );
}
