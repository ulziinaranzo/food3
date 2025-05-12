"use client";

import { useEffect, useState } from "react";
import { Food } from "../admin/_components/Types";
import { HashLoader } from "react-spinners";

type AddFoodToCartProps = {
  onClose: () => void;
  food: Food;
};
type CartItem = {
  food: Food;
  quantity: number;
  foodId: string;
};

export const AddFoodToCart = ({ food, onClose }: AddFoodToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(food.price);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTotalPrice(quantity * food.price);
  }, [quantity, food.price]);

  const handleAddToCart = () => {
    const cartData = localStorage.getItem("cart");
    console.log("cart", cartData);

    let oldCart: CartItem[] = [];

    if (cartData) {
      try {
        oldCart = JSON.parse(cartData);
        if (!Array.isArray(oldCart)) {
          oldCart = [];
        }
      } catch (e) {
        console.error("Error parsing cart data:", e);
        oldCart = [];
      }
    }

    const found = oldCart.find((item) => item.foodId === food._id);

    let newCart;

    if (found) {
      newCart = oldCart.map((item) =>
        item.foodId === food._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = {
        food: { ...food },
        quantity,
        foodId: food._id,
      };
      newCart = [...oldCart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    onClose();
  };

  return (
    <div className="flex absolute inset-0 bg-white rounded-lg w-[826px] h-[412px] p-[24px] gap-[24px] z-10">
      <img src={food.image?.[0]} className="w-[377px] h-[364px] rounded-lg" />
      <div className="flex flex-col">
        <button
          className="ml-[340px] flex justify-center items-center rounded-full w-[36px] h-[36px] text-[16px] bg-white border-[1px] pb-[12px] text-[grey] pt-[6px]"
          onClick={onClose}
        >
          x
        </button>
        <div className="text-[30px] font-[600] text-[#EF4444] mb-[12px]">
          {food.foodName}
        </div>
        <div className="font-[400] text-[16px] text-[#09090B] mb-[90px]">
          {food.ingredients}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="font-[400] text-[16px] text-[#09090B]">
              Нийт үнэ
            </div>
            <div className="text-[24px] text-[#09090B] font-[600]">
              {totalPrice}₮
            </div>
          </div>
          <div className="flex justify-center items-center mt-[6px] gap-[12px]">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="rounded-full bg-white w-[44px] h-[44px] text-[16px] border-[1px]"
            >
              -
            </button>
            <div className="text-[#09090B] text-[18px] font-[600]">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="rounded-full bg-white w-[44px] h-[44px] text-[16px] border-[1px]"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-[377px] h-[44px] rounded-lg bg-black text-white flex justify-center items-center mt-[24px] px-[20px]"
        >
          {loading ? <HashLoader /> : "Сагсанд нэмэх"}
        </button>
      </div>
    </div>
  );
};
