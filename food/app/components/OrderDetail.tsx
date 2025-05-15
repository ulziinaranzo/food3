"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Food } from "../admin/_components/Types";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PaymentCard } from "./PaymentCard";
import { OrderHistoryTabContent } from "./OrderHistoryTabContent";
import { CartCard } from "./CartCard";
import { useAuth } from "../_providers/AuthProvider";
import { toast } from "sonner";
import { api } from "@/axios";

type OrderDetailProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type CartFood = {
  quantity: number;
  foodId: string;
  food: Food;
};

export const OrderDetail = ({ open, setOpen }: OrderDetailProps) => {
  const [cartItems, setCartItems] = useState<CartFood[]>([]);
  const { user, token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedData: CartFood[] = JSON.parse(cartData);
        if (Array.isArray(parsedData)) {
          setCartItems(parsedData);
        }
      } catch (error) {
        console.error("Хоолны мэдээлэл ирсэнгүй", error);
      }
    }
  }, [open]);

  const updatedCart = (updatedItems: CartFood[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleDecrease = (foodId: string) => {
    const updated = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    updatedCart(updated);
  };

  const handleIncrease = (foodId: string) => {
    const updated = cartItems.map((item) =>
      item.foodId === foodId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
    updatedCart(updated);
  };

  const handleRemove = (foodId: string) => {
    const updated = cartItems.filter((item) => item.foodId !== foodId);
    updatedCart(updated);
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    if (!item.food) return sum;
    return sum + item.quantity * item.food.price;
  }, 0);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const orderedItems = cartItems.map((item) => ({
        food: item.foodId,
        quantity: item.quantity,
      }));

      const response = await api.post(`/food-order`, {
        userId: user?._id,
        orderedItems,
      });
      setLoading(false);
      toast.success("Хоолны захиалга амжилттай нэмэгдлээ");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error(error);
      toast.error("Хоолны захиалга хийхэд алда гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[500px] p-[32px] bg-black"
          aria-describedby="cart-description"
        >
          <SheetHeader>
            <SheetTitle className="text-white text-[20px]">
              Таны сагс
            </SheetTitle>
            <p id="cart-description" className="text-sm text-white">
              Та захиалах хоолоо эндээс өөрчилж болно.
            </p>
          </SheetHeader>

          <div className="flex flex-col">
            <Tabs defaultValue="cart" className="w-full">
              <TabsList className="grid grid-cols-2 bg-[#EF4444] w-full h-[44px] rounded-full mt-[8px] mb-[8px]">
                <TabsTrigger value="cart" className="text-[18px] rounded-full">
                  Cart
                </TabsTrigger>
                <TabsTrigger value="order" className="text-[18px] rounded-full">
                  Order
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cart">
                <CartCard
                  cartItems={cartItems}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                  handleRemove={handleRemove}
                  setOpen={setOpen}
                />
                <PaymentCard
                  handleSubmit={handleSubmit}
                  totalAmount={totalAmount}
                />
              </TabsContent>

              <TabsContent value="order">
                <OrderHistoryTabContent />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
