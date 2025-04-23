"use client";
import { useState, useEffect } from "react";
import { FoodMenuIcon } from "../../assets/FoodMenuIcon";
import { LogoIcon } from "../../assets/Logo";
import { OrderIcon } from "../../assets/OrderIcon";
import { SettingsIcon } from "../../assets/SettingsIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { OrderIconBlack } from "@/app/assets/OrderIconBlack";
import { FoodMenuIconWhite } from "@/app/assets/FoodMenuIconWhite";
import { EditIcon } from "@/app/assets/EditIcon";

export default function Home() {
  type Food = {
    _id: string;
    foodName: string;
    image: string[];
    price: number;
    ingredients: string;
  };

  type Category = {
    _id: string;
    categoryName: string;
    foods?: Food[];
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getFoods = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      setFoods(response.data.foodsByCategory);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getFoods(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col bg-white h-screen w-[205px] pt-[36px] p-[20px] gap-[40px]">
        <div className="flex gap-[12px]">
          <div className="w-[46px] h-[37.29px]">
            <LogoIcon />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-black text-[20px] font-[600]">Nom</div>
              <div className="text-[20px] font-[600] text-[#EF4444]">Nom</div>
            </div>
            <div className="text-[#71717A] text-[12px] font-[400]">
              Swift delivery
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-[24px]">
          <div className="flex text-white text-[14px] font-medium bg-black rounded-full pl-[24px] py-[9px] gap-[10px]">
            <FoodMenuIconWhite />
            Хоолны цэс
          </div>
          <div className="flex pl-[24px] py-[10px] text-black text-[14px] gap-[10px] font-medium">
            <OrderIconBlack />
            Захиалгууд
          </div>
          <div className="flex justify-center items-center text-black text-[14px] gap-[10px] font-medium">
            <SettingsIcon />
            Засвар
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col w-full bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B]">
            Хоолны категори
          </div>
          <div className="flex flex-wrap gap-[12px] mt-[16px]">
            {categories.map((item, index) => (
              <Badge
                key={index}
                onClick={() => handleCategorySelect(item._id)}
                className="px-[16px] py-[8px] text-black bg-white hover:bg-[#EF4444] hover:text-white text-[14px] border-[#E4E4E7] border-[1px] rounded-full font-[400] cursor-pointer"
              >
                {item.categoryName}
                <Badge className="px-[10px] py-[2px] bg-[#18181B] rounded-full text-white text-[12px] font-semibold ml-2">
                  {item.foods ? item.foods.length : 0}
                </Badge>
              </Badge>
            ))}
            <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
              <PlusIcon className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
          <div className="text-[20px] font-semibold text-[#09090B] mb-[16px]">
            {selectedCategory
              ? categories.find((cat) => cat._id === selectedCategory)
                  ?.categoryName
              : "Select a category"}
          </div>

          <div className="flex flex-wrap gap-[24px]">
            <div className="flex flex-col gap-[24px] items-center justify-center border-dashed border-[#EF4444] border-[2px] h-[241px] w-[250px] rounded-lg text-[#EF4444] text-[14px] font-medium cursor-pointer">
              <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
                <PlusIcon className="w-[16px] h-[16px]" />
              </button>
              {categoryName} цэсэнд хоол нэмэх
            </div>

            {foods.map((food, index) => (
              <div
                key={index}
                className="flex flex-col p-4 gap-3 bg-white rounded-lg shadow-lg relative h-[241px] w-[250px]"
              >
                <img
                  src={food.image?.[0]}
                  alt={food.foodName}
                  className="w-full h-[150px] object-cover rounded-t-lg"
                />
                <button className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md">
                  <EditIcon />
                </button>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
