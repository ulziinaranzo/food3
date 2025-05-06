"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFoodCard from "./AddFoodCard";
import { FoodCard } from "./FoodCard";
import { toast } from "sonner";
import { TrashIcon } from "@/app/assets/TrashIcon";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

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
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== _id));
      await axios.delete(`http://localhost:3001/food/${_id}`);
      console.log("sdf");
      toast.success("Хоол амжилттай устлаа");
      onClose(true);
      getFoods();
    } catch (error) {
      toast.error("Хоол устгахад алдаа гарлаа");
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      setFoods((prevFoods) =>
        prevFoods.filter((food) => food.category !== categoryId)
      );
      await axios.delete(`http://localhost:3001/category/${categoryId}`);
      toast.success("Категори болон категори дахь хоолууд амжилттай устлаа");
      onClose(true);
      await getFoods();
    } catch (error) {
      toast.error("Категори болон категори дахь хоолууд устгахад алдаа гарлаа");
      console.error(
        "Категори болон категори дахь хоолууд утсгахад алдаа гарлаа"
      );
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg p-[24px]">
      <div className="flex items-center justify-between text-[20px] font-semibold text-[#09090B] mb-[16px]">
        <>{categoryName}</>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <button className="w-[30px] h-[30px]">
              <TrashIcon />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
              <p>Бүх категори дахь хоолнууд хамт устах болно</p>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-5">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Буцах
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteCategory(categoryId);
                  setShowDeleteDialog(false);
                }}
              >
                Устгах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-[16px] flex-wrap">
        <AddFoodCard
          selectedCategoryName={categoryName}
          categoryId={categoryId}
          onUpdate={getFoods}
        />

        {foods?.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard
                selectedCategory={categoryId}
                categoryId={categoryId}
                food={food}
                onDelete={handleDeleteFood}
                categories={[]}
                setSelectedCategory={() => {}}
                onUpdate={() => {
                  window.location.reload();
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFoods;

// export const OrderDetail = () => {
//   const [cartItems, setCartItems] = useState<(CartItem & Food)[]>([]);
//   const [foods, setFoods] = useState<Food[]>([]);

//   const getFoods = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/food`);
//       setFoods(response.data?.foodsByCategory);
//     } catch (error) {
//       console.error("Хоолоо татаж авахад алдаа гарлаа");
//     }
//   };

//   useEffect(() => {
//     const getCartItems = async () => {
//       await getFoods();
//       const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
//       const merged = cart.map((item) => {
//         const foodData = foods.find((f) => f._id === item.foodId);
//         return {
//           ...item,
//           ...foodData,
//         };
//       });
//       setCartItems(merged);
//     };
//     getCartItems();
//   }, [foods.length]);

//   const handleIncrease = (foodId: string) => {
//     const updatedItems = cartItems.map((item) =>
//       item.foodId === foodId
//         ? { ...item, quantity: String(Number(item.quantity) + 1) }
//         : item
//     );
//     setCartItems(updatedItems);
//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedItems.map(({ _id, quantity }) => ({ foodId: _id, quantity })))
//     );
//   };

//   const handleDecrease = (foodId: string) => {
//     const updatedItems = cartItems.map((item) =>
//       item.foodId === foodId
//         ? { ...item, quantity: String(Math.max(1, Number(item.quantity) - 1)) }
//         : item
//     );
//     setCartItems(updatedItems);
//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedItems.map(({ _id, quantity }) => ({ foodId: _id, quantity })))
//     );
//   };

//   const handleRemove = (foodId: string) => {
//     const updatedItems = cartItems.filter((item) => item.foodId !== foodId);
//     setCartItems(updatedItems);
//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedItems.map(({ _id, quantity }) => ({ foodId: _id, quantity })))
//     );
//   };

//   return (
//     <div className="flex flex-col fixed w-[535px] h-full rounded-lg bg-[#404040] p-[32px] top-[0%] left-[50%] z-40">
//       <div className="flex gap-[12px]">
//         <div className="w-[24px] h-[24px]">
//           <CartIcon />
//         </div>
//         <div className="text-[white] text-[20px] font-[600]">Захиалгын мэдээлэл</div>
//       </div>

//       <Tabs defaultValue="cart" className="w-full">
//         <TabsList className="grid grid-cols-2 bg-[#EF4444] w-[471px] h-[44px] rounded-full mt-[8px] mb-[8px]">
//           <TabsTrigger value="cart" className="text-[18px] rounded-full">
//             Cart
//           </TabsTrigger>
//           <TabsTrigger value="order" className="text-[18px] rounded-full">
//             Order
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="cart">
//           <Card className="bg-white ">
//             <CardContent className="flex flex-col gap-[5px]">
//               <div className="flex justify-between">
//                 <h3 className="text-[#09090B] font-[600] text-[20px]">Mиний сагс</h3>
//                 <Button variant="outline" className="w-full text-red-400 border-red-400 rounded-full">
//                   Хоол нэмэх
//                 </Button>
//               </div>

//               {cartItems.map((item, idx) => (
//                 <div
//                   className={`flex gap-3 items-start pt-1 ${
//                     idx < cartItems.length - 1 ? "border-b border-dashed border-gray-300" : ""
//                   }`}
//                   key={item.foodId}
//                 >
//                   <Image
//                     src={item.img?.[0]}
//                     alt="Food"
//                     width={124}
//                     height={120}
//                     className="rounded-md object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="text-red-400 font-[700] text-[16px]">{item.foodName}</p>
//                     <p className="text-[12px] font-[400] text-[#09090B]">{item.ingredients}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full text-black"
//                         onClick={() => handleDecrease(item.foodId)}
//                       >
//                         <Minus size={16} />
//                       </Button>
//                       <span className="font-[600] text-[18px] text-[#09090B]">{item.quantity}</span>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full text-black"
//                         onClick={() => handleIncrease(item.foodId)}
//                       >
//                         <Plus size={16} />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-red-400 "
//                       onClick={() => handleRemove(item.foodId)}
//                     >
//                       <Trash2 size={16} />
//                     </Button>
//                     <p className="text-[18px] font-[700] text-[#09090B] mt-[30px]">
//                       {Number(item.quantity) * item.price}₮
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };
