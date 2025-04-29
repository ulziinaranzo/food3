"use client"

import { DateIcon } from "@/app/assets/DateIcon"
import { Checkbox } from "@/components/ui/checkbox"

 export const TitleOrders = () => {
    return (
        <div className="w-full flex h-[52px]">
            <div className="flex w-[48px] justify-center items-center">
              <Checkbox/>
            </div>
            <div className="flex w-[56px] justify-center items-center text-[#09090B] text-[14px]">№</div>
            <div className="grid grid-cols-6 w-full">
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">Үйлчлүүлэгч</div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">Хоол</div>
              <div className="flex items-center justify-between text-[14px] text-[#71717A] font-medium pr-[20px]">
                Огноо <DateIcon />
              </div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">Нийт</div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">Хүргэлтийн хаяг</div>
              <div className="flex items-center text-[14px] text-[#71717A] font-medium">Хүргэлтийн төлөв</div>
            </div>
          </div>
    )
 }