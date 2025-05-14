"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyFoodCart } from "./EmptyFoodCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartFood } from "./OrderDetail";
import { useState } from "react";
type CartCardProps = {
  handleDecrease: (foodId: string) => void;
  handleIncrease: (foodId: string) => void;
  handleRemove: (foodId: string) => void;
  cartItems: CartFood[];
  setOpen: (open: boolean) => void;
};
export const CartCard = ({
  handleDecrease,
  handleIncrease,
  handleRemove,
  cartItems,
  setOpen,
}: CartCardProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-[5px] p-[16px]">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[#09090B] font-[600] text-[20px]">
              Миний сагс
            </h3>
          </div>
        </CardHeader>
        <div className="max-h-[600px] overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <EmptyFoodCart setOpen={setOpen} />
          ) : (
            cartItems.map((item, idx) =>
              item.food ? (
                <div
                  key={`${item.foodId}-${idx}`}
                  className={`flex gap-3 items-start pt-1] ${
                    idx < cartItems.length - 1
                      ? "border-b border-dashed border-gray-300"
                      : ""
                  }`}
                >
                  <img
                    src={item.food.image?.[0]}
                    alt="Food"
                    width={124}
                    height={120}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-red-400 font-[700] text-[16px]">
                      {item.food.foodName}
                    </p>
                    <p className="text-[12px] font-[400] text-[#09090B]">
                      {item.food.ingredients}
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
                      {item.quantity * item.food.price}₮
                    </p>
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};
