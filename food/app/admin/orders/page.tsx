"use client";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PaginationOrder } from "../_components/PaginationOrder";
import { Order } from "../_components/Types";
import { TitleOrders } from "../_components/TitleOrders";
import { AvatarBadge } from "../_components/AvatarBadge";
import { DatePicker } from "../_components/DatePicker";
import { format } from "date-fns";
import { DropDownStatus } from "../_components/DropDownOrderStatus";

const ordersPerPage = 12;

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/food-order/");
      setOrders(response.data.foodOrders);
    } catch (error) {
      console.error("Хоолны захиалгууд авах үед алдаа гарлаа", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const paginatedOrders = useMemo<Order[]>(() => {
    const start = (currentPage - 1) * ordersPerPage;
    return orders.slice(start, start + ordersPerPage);
  }, [currentPage, orders]);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <AvatarBadge />
        </div>
        <div className="flex flex-col w-full h-[800px] bg-white rounded-lg">
          <div className="flex p-[16px] w-full h-[76px] justify-between">
            <div className="flex flex-col">
              <div className="text-[20px] font-bold text-[#09090B]">Orders</div>
              <div className="font-medium text-[12px] text-[#71717A]">
                {orders.length} хоол
              </div>
            </div>
            <div className="flex gap-[12px] items-center">
              <DatePicker />
              <div className="flex justify-center items-center font-medium text-[14px] rounded-full text-white px-[8px] py-[16px] bg-[#d1d1d1]">
                Хүргэлтийн төлөв өөрчлөх
              </div>
            </div>
          </div>
          <TitleOrders />
          {paginatedOrders.map((item, index) => {
            const statusClasses = {
              delivered:
                "border-green-500 text-green-600 bg-green-50 hover:bg-green-100",
              cancelled:
                "border-gray-400 text-gray-600 bg-gray-50 hover:bg-gray-100",
              pending: "border-red-500 text-red-600 bg-red-50 hover:bg-red-100",
            };
            const statusText = {
              delivered: "Хүргэгдсэн",
              cancelled: "Цуцалсан",
              pending: "Хүлээгдэж буй",
            };
            return (
              <div key={index} className="w-full flex h-[52px]">
                <div className="flex w-[48px] justify-center items-center">
                  <Checkbox />
                </div>
                <div className="flex w-[56px] justify-center items-center text-[#09090B] text-[14px]">
                  {index + 1 + (currentPage - 1) * ordersPerPage}
                </div>
                <div className="grid grid-cols-6 w-full">
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.user?.name || "Нэр алга"}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.foodOrderItems
                      .map((f) => f.food?.foodName || "Хоол алга")
                      .join(", ")}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {format(new Date(item.createdAt), "yyyy-MM-dd")}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.totalPrice}₮
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium truncate overflow-hidden whitespace-nowrap max-w-[250px]">
                    {item.address || "Хаяг байхгүй"}
                  </div>
                  <div className="flex items-center text-[14px] font-medium pl-[16px] py-[12px]">
                    <DropDownStatus
                      orderId={item._id}
                      status={item.status}
                      onChange={(id, newStatus) => {
                        setOrders((prevOrders) =>
                          prevOrders.map((order) =>
                            order._id === id
                              ? { ...order, status: newStatus }
                              : order
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          <PaginationOrder
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
