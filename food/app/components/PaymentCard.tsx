"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { HashLoader } from "react-spinners";

type PaymentCardProps = {
  totalAmount: number;
  handleSubmit: () => void;
};

export const PaymentCard = ({
  totalAmount,
  handleSubmit,
}: PaymentCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Card className="bg-white rounded-lg text-white mt-[25px]">
      <CardHeader>
        <h3 className="font-[600] text-black text-[20px]">
          Төлбөрийн мэдээлэл
        </h3>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-[16px] mt-[8px]">
          <span className="text-[#71717A] font-[400]">Нийт хоол</span>
          <span className="font-[600] text-black">{totalAmount}₮</span>
        </div>
        <div className="flex justify-between text-[16px] mt-[8px]">
          <span className="text-[#71717A] font-[400]">Хүргэлт</span>
          <span className="font-[600] text-black">6000₮</span>
        </div>

        <div className="border-b border-dashed border-gray-300 pt-[20px] my-[10px]"></div>

        <div className="flex justify-between text-[16px] mt-[8px]">
          <span className="text-[#71717A] font-[400]">Нийт</span>
          <span className="font-[600] text-black">{totalAmount + 6000}₮</span>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 mt-4 rounded-full text-[14px]"
          disabled={loading}
        >
          {loading ? <HashLoader size={20} color="#fff" /> : "Checkout"}
        </Button>
      </CardContent>
    </Card>
  );
};
