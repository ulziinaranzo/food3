
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FoodIcon } from "../assets/FoodIcon";
import { TimeIcon } from "../assets/TimeIcon";
import { LocationIcon } from "../assets/LocationIcon";

export const OrderHistoryTabContent = () => {
  return (
    <Card className="bg-white rounded-lg text-white mt-[25px]">
      <CardContent className="p-[16px]">
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
              <div className="flex text-[#71717A]">Sunshine Stackers</div>
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
  );
};
