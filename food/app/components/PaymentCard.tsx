"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PaymentCardProps = {
    totalAmount: number
}
export const PaymentCard = ({totalAmount}: PaymentCardProps) => {
    return (
        <Card className="bg-white rounded-lg text-white mt-[25px]">
                  <CardContent>
                    <h3 className="font-[600] text-black text-[20px]">
                      Төлбөрийн мэдээлэл
                    </h3>
                    <div className="flex justify-between text-[16px] mt-[20px]">
                      <span className="text-[#71717A] font-[400]">Нийт хоол</span>
                      <span className="font-[600] text-black">{totalAmount}₮</span>
                    </div>
                    <div className="flex justify-between text-[16px] mt-[8px]">
                      <span className="text-[#71717A] font-[400]">Хүргэлт</span>
                      <span className="font-[600] text-black">6000₮</span>
                    </div>
                    <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
                    <div className="flex justify-between text-[16px] mt-[8px]">
                      <span className="text-[#71717A] font-[400]">Нийт</span>
                      <span className="font-[600] text-black">{totalAmount}₮</span>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 mt-2 rounded-full text-[14px]">
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
    )
}