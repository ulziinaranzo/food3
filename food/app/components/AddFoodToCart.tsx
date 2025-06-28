"use client";
import { useEffect, useState } from "react";
import { Food } from "../admin/_components/Types";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AddFoodToCartProps = {
  open: boolean;
  onClose: () => void;
  food: Food;
};

type CartItem = {
  food: Food;
  quantity: number;
  foodId: string;
};

export const AddFoodToCart = ({ open, onClose, food }: AddFoodToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(food.price);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTotalPrice(quantity * food.price);
  }, [quantity, food.price]);

  const handleAddToCart = () => {
    setLoading(true);

    try {
      const cartData = localStorage.getItem("cart");
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
      setQuantity(1);
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[826px] p-0">
        <div className="flex w-full h-[412px] p-[24px] gap-[24px]">
          <img
            src={food.image?.[0]}
            alt={food.foodName}
            className="w-[377px] h-[364px] rounded-lg object-cover"
          />
          <div className="flex flex-col flex-1">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[30px] font-[600] text-[#EF4444] text-left">
                {food.foodName}
              </DialogTitle>
            </DialogHeader>

            <div className="font-[400] text-[16px] text-[#09090B] mb-[90px]">
              {food.ingredients}
            </div>

            <div className="flex justify-between mb-[24px] gap-[40px]">
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
                  className="rounded-full bg-white w-[44px] h-[44px] text-[16px] border-[1px] hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <div className="text-[#09090B] text-[18px] font-[600] min-w-[20px] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="rounded-full bg-white w-[44px] h-[44px] text-[16px] border-[1px] hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full h-[44px] rounded-lg bg-black text-white flex justify-center items-center px-[20px] hover:bg-gray-800 transition-colors disabled:opacity-50 mt-[20px]"
            >
              {loading ? (
                <HashLoader size={20} color="#ffffff" />
              ) : (
                "Сагсанд нэмэх"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
