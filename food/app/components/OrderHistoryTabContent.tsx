"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FoodIcon } from "../assets/FoodIcon";
import { TimeIcon } from "../assets/TimeIcon";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import { useAuth } from "../_providers/AuthProvider";
import axios from "axios";
import { Order } from "../admin/_components/Types";
import { format } from "date-fns";

export const OrderHistoryTabContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      console.log("USER TOKEN:", token);
      const response = await axios.get(
        `http://localhost:3001/food-order/${user?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      setOrders(response.data.foodOrders);
    } catch (error) {
      console.error("Хоолны захиалгуудыг харуулахад алдаа гарлаа", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getOrders();
    }
  }, [user]);

  return (
    <Card className="bg-white rounded-lg text-white mt-[25px] max-h-[800px] overflow-y-auto pr-2">
      <CardContent className="p-[16px]">
        <h3 className="font-[600] text-black text-[20px]">Захиалгын түүх</h3>

        {orders.length === 0 && !loading && (
          <div className="text-center text-[#71717A] mt-6">
            Та одоогоор захиалга хийгээгүй байна.
          </div>
        )}

        {orders.map((order) => (
          <div key={order._id} className="mb-6">
            <div className="flex justify-between">
              <div className="text-black text-[20px] font-bold">
                {order.totalPrice}₮ (#{order._id.slice(-5)})
              </div>
              <button
                className={`px-[10px] py-[6px] text-black rounded-full font-semibold text-[12px] border 
                  ${
                    order.status === "pending"
                      ? "border-yellow-500"
                      : order.status === "delivered"
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
              >
                {order.status === "pending"
                  ? "Хүлээгдэж буй"
                  : order.status === "delivered"
                  ? "Хүргэгдсэн"
                  : "Цуцлагдсан"}
              </button>
            </div>

            {order.foodOrderItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-[12px] mt-[12px]"
              >
                <div className="flex items-center gap-[8px]">
                  <FoodIcon />
                  <div className="text-[#71717A]">{item.food?.foodName}</div>
                </div>
                <div className="text-[#71717A]">
                  {item.quantity} x {item.food?.price}₮
                </div>
              </div>
            ))}

            <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
              <TimeIcon />
              <div className="text-[#71717A]">
                {format(new Date(order.createdAt), "yyyy/MM/dd")}
              </div>
            </div>

            <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
              <div className="w-[16px] h-[16px]">
                <LocationIcon />
              </div>
              <div className="text-[#71717A] truncate">
                {user?.address || "Хаяг байхгүй"}
              </div>
            </div>

            <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
