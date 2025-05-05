"use client";
import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { CategorySection } from "./CategorySection";
import axios from "axios";
import { Category } from "../admin/_components/Types";
import { FilteredCategoryFoods } from "./FilteredCategoryFoods";
import { CartIcon } from "../assets/CartIcon";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onClose, setOnClose] = useState<boolean>(false);
  const [filteredCategories, setFilteredCategories] = useState<boolean>(false);
  const [isOrder, setIsOrder] = useState(false)

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
      <div className="flex flex-col fixed w-[535px] h-full rounded-lg bg-[#404040] p-[32px] top-[0%] left-[50%] z-40">
        <div className="flex gap-[12px]">
          <div className="w-[24px] h-[24px]"><CartIcon/></div>
          <div className="text-[white] text-[20px] font-[600]">Захиалгын мэдээлэл</div>
        </div>

      <Tabs defaultValue="cart" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#EF4444] w-[471px] h-[44px] rounded-full mt-[8px] mb-[8px]">
          <TabsTrigger value="cart" className="text-[18px] rounded-full">Cart</TabsTrigger>
          <TabsTrigger value="order" className="text-[18px] rounded-full">Order</TabsTrigger>
        </TabsList>

        <TabsContent value="cart">
          <Card className="bg-white ">
            <CardContent className="flex flex-col gap-[5px]">
              <h3 className="text-[#09090B] font-[600] text-[20px]">Mиний сагс</h3>

              {[1, 2].map((_, idx) => (
                <div key={idx} className={`flex gap-3 items-start pt-1 ${
                  idx < 1 ? 'border-b border-dashed border-gray-300' : ''
                }`}>
                  <Image
                    src="/placeholder.jpg"
                    alt="Food"
                    width={124}
                    height={120}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-red-400 font-[700] text-[16px]">Sunshine Stackers</p>
                    <p className="text-[12px] font-[400] text-[#09090B]">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="icon" className="rounded-full text-black"><Minus size={16} /></Button>
                      <span className="font-[600] text-[18px] text-[#09090B]">1</span>
                      <Button variant="ghost" size="icon" className="rounded-full text-black"><Plus size={16} /></Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button variant="ghost" size="icon" className="text-red-400 "><Trash2 size={16} /></Button>
                    <p className="text-[18px] font-[700] text-[#09090B] mt-[30px]">$12.99</p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full text-red-400 border-red-400 rounded-full">
                Хоол нэмэх
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order">
          <p className="text-center text-gray-400">Order view placeholder</p>
        </TabsContent>
      </Tabs>

      <Card className="bg-white rounded-lg text-white mt-[8px] ">
        <CardContent className="">
          <h3 className="font-[600] text-black text-[20px] ">Төлбөрийн мэдээлэл</h3>
          <div className="flex justify-between text-[16px] mt-[10px]">
            <span className="text-[#71717A] font-[400]">Нийт хоол</span>
            <span className="font-[600] text-black">$25.98</span>
          </div>
          <div className="flex justify-between text-[16px] mt-[8px]">
            <span className="text-[#71717A] font-[400]">Хүргэлт</span>
            <span className="font-[600] text-black">$0.99</span>
          </div>
          <div className="flex justify-between text-[16px] mt-[8px]">
            <span className="text-[#71717A] font-[400]">Нийт</span>
            <span className="font-[600] text-black">$26.97</span>
          </div>
          <Button className="w-full bg-red-500 hover:bg-red-600 mt-2 rounded-full text-[14px]">Checkout</Button>
        </CardContent>
      </Card>
    </div>
      </div>
  );
};
