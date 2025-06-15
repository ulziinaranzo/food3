"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FoodIcon } from "../assets/FoodIcon";
import { TimeIcon } from "../assets/TimeIcon";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import { useAuth } from "../_providers/AuthProvider";
import { Order } from "../admin/_components/Types";
import { format } from "date-fns";
import { api } from "@/axios";

export const OrderHistoryTabContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/food-order/${user?._id}`);
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
    <Card className="bg-white rounded-lg text-white mt-[25px] max-h-[800px]">
      <CardHeader>
        <h3 className="font-semibold text-black text-[20px]">Захиалгын түүх</h3>
      </CardHeader>

      <CardContent className="p-[16px] overflow-y-auto max-h-[700px] pr-2">
        {orders.length === 0 && !loading ? (
          <p className="text-center text-[#71717A] mt-6">
            Та одоогоор захиалга хийгээгүй байна.
          </p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-6">
              <div className="flex justify-between">
                <div className="text-black text-[20px] font-bold">
                  {order.totalPrice}₮ (#{order._id.slice(-5)})
                </div>
                <span
                  className={`px-[10px] py-[6px] text-black rounded-full font-semibold text-[12px] border ${
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
                </span>
              </div>

              {order.foodOrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-[12px] mt-[12px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <FoodIcon />
                    <span className="text-[#71717A]">
                      {item.food?.foodName}
                    </span>
                  </div>
                  <span className="text-[#71717A]">
                    {item.quantity} x {item.food?.price}₮
                  </span>
                </div>
              ))}

              <div className="flex items-center text-[12px] mt-[12px] gap-[8px]">
                <TimeIcon />
                <span className="text-[#71717A]">
                  {format(new Date(order.createdAt), "yyyy/MM/dd")}
                </span>
              </div>

              <div className="flex items-center text-[12px] mt-[12px] gap-[8px]">
                <div className="w-[16px] h-[16px]">
                  <LocationIcon />
                </div>
                <span className="text-[#71717A] truncate">
                  {user?.address || "Хаяг байхгүй"}
                </span>
              </div>

              <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
