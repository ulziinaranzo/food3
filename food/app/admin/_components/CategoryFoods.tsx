"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFoodCard from "./AddFoodCard";
import { FoodCard } from "./FoodCard";
import { toast } from "sonner";
import { TrashIcon } from "@/app/assets/TrashIcon";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CategoryFoodsProps {
  onClose: (value: boolean) => void;
  categoryId: string;
  categoryName: string;
}
export type Food = {
  _id: string;
  foodName: string;
  image: string[];
  price: number;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
  category: string;
};

const CategoryFoods = ({
  onClose,
  categoryId,
  categoryName,
}: CategoryFoodsProps) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const getFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${categoryId}`
      );
      setFoods(response.data?.foodsByCategory);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };
  
  const handleDeleteFood = async (_id: string) => {
    try {
      setFoods((prevFoods) => prevFoods.filter(food => food._id !== _id))
      await axios.delete(`http://localhost:3001/food/${_id}`);
      console.log("sdf")
      toast.success("Хоол амжилттай устлаа");
      onClose(true)
      getFoods()
    } catch (error) {
      toast.error("Хоол устгахад алдаа гарлаа");
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string ) => {
    try { 
      setFoods((prevFoods) => prevFoods.filter(food => food.category !== categoryId));
      await axios.delete(`http://localhost:3001/category/${categoryId}`)
      toast.success("Категори болон категори дахь хоолууд амжилттай устлаа")
      onClose(true)
      await getFoods()
    } catch (error) {
      toast.error("Категори болон категори дахь хоолууд устгахад алдаа гарлаа")
      console.error("Категори болон категори дахь хоолууд утсгахад алдаа гарлаа")
    }
  }

  useEffect(() => {
    getFoods();
  }, []);


  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
      <div className="flex items-center justify-between text-[20px] font-semibold text-[#09090B] mb-[16px]">
        <>{categoryName}</>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
          <button className="w-[30px] h-[30px]"><TrashIcon/></button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
              <p>Бүх категори дахь хоолнууд хамт устах болно</p>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-5">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Буцах</Button>
              <Button variant="destructive" onClick={() => {handleDeleteCategory(categoryId); setShowDeleteDialog(false)}}>Устгах</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
      </div>

      <div className="flex gap-[16px] flex-wrap">
        <AddFoodCard
          selectedCategoryName={categoryName}
          categoryId={categoryId}
        />

        {foods?.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard selectedCategory={categoryId} categoryId={categoryId} food={food} onDelete={handleDeleteFood} categories={[]} setSelectedCategory={() => {}} onUpdate={getFoods}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFoods;
