"use client";

import { useMemo, useState } from "react";
import { DateIcon } from "../assets/DateIcon";
import { FoodMenuIcon } from "../assets/FoodMenuIcon";
import { LogoIcon } from "../assets/Logo";
import { OrderIcon } from "../assets/OrderIcon";
import { SettingsIcon } from "../assets/SettingsIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ordersPerPage = 12;
const orders = [
  {
    number: "1",
    customer: "ulzii1018@gmail.com",
    food: "2 хоол",
    date: "2024/12/12",
    totalPrice: "$ 25.84",
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
    deliveryState: "Хүлээгдэж буй",
  },
  {
    number: "2",
    customer: "test@gmail.com",
    food: "3 хоол",
    date: "2024/12/13",
    totalPrice: "$ 32.10",
    deliveryAddress:
      "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
    deliveryState: "Хүргэгдсэн",
  },
  {
    number: "3",
    customer: "demo@gmail.com",
    food: "1 хоол",
    date: "2024/12/14",
    totalPrice: "$ 12.50",
    deliveryAddress:
      "Ч2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоон20",
    deliveryState: "Цуцалсан",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginatedOrders = useMemo<number>(() => {
    const start = (currentPage - 1) * ordersPerPage;
    return orders.slice(start, start + ordersPerPage);
  }, [currentPage]);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col bg-white h-screen w-[205px] pt-[36px] p-[20px] gap-[40px]">
        <div className="flex gap-[12px]">
          <div className="w-[46px] h-[37.29px]">
            <LogoIcon />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-black text-[20px] font-[600]">Nom</div>
              <div className="text-[20px] font-[600] text-[#EF4444]">Nom</div>
            </div>
            <div className="text-[#71717A] text-[12px] font-[400]">
              Swift delivery
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="flex pl-[24px] py-[10px] text-black text-[14px] gap-[10px] font-medium">
            <FoodMenuIcon />
            Хоолны цэс
          </div>
          <div className="flex text-white text-[14px] font-medium bg-black rounded-full pl-[24px] py-[9px] gap-[10px]">
            <OrderIcon />
            Захиалгууд
          </div>
          <div className="flex justify-center items-center text-black text-[14px] gap-[10px] font-medium">
            <SettingsIcon />
            Засвар
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-[24px] pt-[24px] pr-[40px] pb-[52px] bg-[#E4E4E7] w-full gap-[24px]">
        <div className="flex justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full h-[800px] bg-white rounded-lg">
          <div className="flex p-[16px] w-full h-[76px] justify-between">
            <div className="flex flex-col">
              <div className="text-[20px] font-bold text-[#09090B]">Orders</div>
              <div className="font-medium text-[12px] text-[#71717A]">
                {orders.length} хоол
              </div>
            </div>
            <div className="flex gap-[12px]">
              <div className="flex justify-center items-center font-medium text-[14px] rounded-full text-white px-[8px] py-[16px] bg-[#d1d1d1]">
                Хүргэлтийн төлөв өөрчлөх
              </div>
            </div>
          </div>

          <div className="w-full flex h-[52px]">
            <div className="flex w-[48px] justify-center items-center">
              <Checkbox />
            </div>
            <div className="flex w-[56px] justify-center items-center text-[#09090B] text-[14px]">
              №
            </div>
            <div className="grid grid-cols-6 w-full">
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                Үйлчлүүлэгч
              </div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                Хоол
              </div>
              <div className="flex items-center justify-between text-[14px] text-[#71717A] font-medium pr-[20px]">
                Огноо <DateIcon />
              </div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                Нийт
              </div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                Хүргэлтийн хаяг
              </div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                Хүргэлтийн төлөв
              </div>
            </div>
          </div>

          {orders.map((item, index) => {
            const statusClasses = {
              Хүргэгдсэн:
                "border-green-500 text-green-600 bg-green-50 hover:bg-green-100",
              Цуцалсан:
                "border-gray-400 text-gray-600 bg-gray-50 hover:bg-gray-100",
              "Хүлээгдэж буй":
                "border-red-500 text-red-600 bg-red-50 hover:bg-red-100",
            };

            return (
              <div key={index} className="w-full flex h-[52px]">
                <div className="flex w-[48px] justify-center items-center">
                  <Checkbox />
                </div>
                <div className="flex w-[56px] justify-center items-center text-[#09090B] text-[14px]">
                  {item.number}
                </div>
                <div className="grid grid-cols-6 w-full">
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.customer}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.food}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.date}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium">
                    {item.totalPrice}
                  </div>
                  <div className="flex items-center text-[14px] text-[#71717A] font-medium truncate overflow-hidden whitespace-nowrap max-w-[250px]">
                    {item.deliveryAddress}
                  </div>
                  <div className="flex items-center text-[14px] font-medium pl-[16px] py-[12px]">
                    <button
                      className={`flex justify-center items-center gap-[10px] border-[2px] rounded-full px-[10px] py-[8px] transition-colors duration-200 ${
                        statusClasses[item.deliveryState]
                      }`}
                    >
                      {item.deliveryState}
                      <DateIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
