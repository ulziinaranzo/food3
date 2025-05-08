"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { FoodIcon } from "../assets/FoodIcon";
import { TimeIcon } from "../assets/TimeIcon";
import { LocationIcon } from "../assets/LocationIcon";
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
import { Card, CardContent } from "@/components/ui/card";

type LocalCartItem = {
  foodId: string;
  quantity: number;
};
type OrderDetailProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type CartItem = {
  quantity: number;
  foodId: string;
  food: Food;
};

export const OrderDetail = ({ open, setOpen }: OrderDetailProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedData: CartItem[] = JSON.parse(cartData);
        if (Array.isArray(parsedData)) {
          setCartItems(parsedData);
        }
      } catch (error) {
        console.error("Хоолны мэдээлэл ирсэнгүй", error);
      }
    }
  }, [open]);

  const updatedCart = (updatedItems: CartItem[]) => {
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
    const updated = cartItems.filter
  }

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[1200px] p-[32px] bg-black">
          <SheetHeader>
            <SheetTitle className="text-white text-[20px]">
              Таны сагс
            </SheetTitle>
            <p className="text-sm text-white">
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
                <Card className="bg-white">
                  <CardContent className="flex flex-col gap-[5px]">
                    <div className="flex justify-between">
                      <h3 className="text-[#09090B] font-[600] text-[20px]">
                        Mиний сагс
                      </h3>
                    </div>

                    {cartItems.map((item, idx) => (
                      <div
                        className={`flex gap-3 items-start pt-1 ${
                          idx < cartItems.length - 1
                            ? "border-b border-dashed border-gray-300"
                            : ""
                        }`}
                        key={`${item.foodId}-${idx}`}
                      >
                        <img
                          src={item.image?.[0]}
                          alt="Food"
                          width={124}
                          height={120}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-red-400 font-[700] text-[16px]">
                            {item.foodName}
                          </p>
                          <p className="text-[12px] font-[400] text-[#09090B]">
                            {item.ingredients}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full text-black"
                              onClick={() => handleDecrease(item.foodId)}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="font-[600] text-[18px] text-[#09090B]">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full text-black"
                              onClick={() => handleIncrease(item.foodId)}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400"
                            onClick={() => handleRemove(item.foodId)}
                          >
                            <Trash2 size={16} />
                          </Button>
                          <p className="text-[18px] font-[700] text-[#09090B] mt-[30px]">
                            {Number(item.quantity) * item.price}₮
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <PaymentCard totalAmount={totalAmount} />
              </TabsContent>

              <TabsContent value="order">
                <Card className="bg-white rounded-lg text-white mt-[25px]">
                  <CardContent>
                    <h3 className="font-[600] text-black text-[20px]">
                      Захиалгын түүх
                    </h3>
                    <div className="flex flex-col mt-[20px]">
                      <div className="flex justify-between">
                        <div className="text-black text-[20px] font-bold">
                          26.97₮ (#20156)
                        </div>
                        <button className="px-[10px] py-[6px] border-[1px] border-[red] text-black rounded-full font-semibold text-[12px]">
                          Pending
                        </button>
                      </div>
                      <div className="flex justify-between text-[12px] mt-[12px]">
                        <div className="flex items-center justify-center gap-[8px]">
                          <FoodIcon />
                          <div className="flex text-[#71717A]">
                            Sunshine Stackers
                          </div>
                        </div>
                        <div className="text-[#71717A]">x 1</div>
                      </div>
                      <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
                        <TimeIcon />
                        <div className="text-[#71717A]">2024/12/20</div>
                      </div>
                      <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
                        <div className="w-[16px] h-[16px]">
                          <LocationIcon />
                        </div>
                        <div className="text-[#71717A] truncate">
                          2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг...
                        </div>
                      </div>
                      <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
