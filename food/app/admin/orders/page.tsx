"use client";
import { useMemo, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { PaginationOrder } from "../_components/PaginationOrder";
import { Order } from "../_components/Types";
import { TitleOrders } from "../_components/TitleOrders";
import { AvatarBadge } from "../_components/AvatarBadge";
import { DatePicker } from "../_components/DatePicker";
import { format } from "date-fns";
import { DropDownStatus } from "../_components/DropDownOrderStatus";
import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { api, setAuthToken } from "@/axios";
import { DateRange } from "react-day-picker";

export default function Home() {
  const ordersPerPage = 12;
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signup");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);
  if (!user || user.role !== "admin") {
    return (
      <div className="text-bold text-[30px] flex justify-center mt-[100px] text-black">
        ERROR... 404
      </div>
    );
  }
  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);
      const response = await api.get(`/food-order/`);
      setOrders(response.data.foodOrders);
    } catch (error) {
      console.error("Хоолны захиалгууд авах үед алдаа гарлаа", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) return orders;
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const from = dateRange?.from ? new Date(dateRange.from) : null;
      const to = dateRange?.to ? new Date(dateRange.to) : null;
      return (!from || orderDate >= from) && (!to || orderDate <= to);
    });
  }, [orders, dateRange]);
  const paginatedOrders = useMemo<Order[]>(() => {
    const start = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(start, start + ordersPerPage);
  }, [currentPage, filteredOrders]);
  const totalPages = Math.ceil((filteredOrders?.length || 0) / ordersPerPage);

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
                {filteredOrders.length} хоол
              </div>
            </div>
            <div className="flex gap-[12px] items-center">
              <DatePicker onDateChange={setDateRange} />
              <div className="flex justify-center items-center font-medium text-[14px] rounded-full text-white px-[8px] py-[16px] bg-[#d1d1d1]">
                Хүргэлтийн төлөв өөрчлөх
              </div>
            </div>
          </div>

          <TitleOrders />

          {paginatedOrders.map((item, index) => {
            return (
              <div key={item._id} className="w-full flex h-[52px]">
                <div className="flex w-[48px] justify-center items-center">
                  <Checkbox />
                </div>
                <div className="flex w-[56px] justify-center items-center text-[#09090B] text-[14px]">
                  {index + 1 + (currentPage - 1) * ordersPerPage}
                </div>
                <div className="grid grid-cols-6 w-full">
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.user?._id.slice(-16) || "Нэр алга"}
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
                        setOrders((prev) =>
                          prev.map((order) =>
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
