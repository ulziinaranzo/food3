"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useState } from "react";
import clsx from "clsx";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

const statusText = {
  delivered: "Хүргэгдсэн",
  cancelled: "Цуцалсан",
  pending: "Хүлээгдэж буй",
};

const statusStyle = {
  delivered: "border-green-500 bg-green-100 text-green-700",
  cancelled: "border-gray-500 bg-gray-100 text-gray-700",
  pending: "border-red-500 bg-red-100 text-red-700",
};

type Props = {
  orderId: string;
  status: "pending" | "delivered" | "cancelled";
  onChange: (
    orderId: string,
    status: "pending" | "delivered" | "cancelled"
  ) => void;
};

export const DropDownStatus = ({ orderId, status, onChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const handleStatusChange = async (
    newStatus: "pending" | "delivered" | "cancelled"
  ) => {
    try {
      setLoading(true);
      const res = await api.put(`/food-order/${orderId}/status/`, {
        status: newStatus,
      });

      if (res.status === 200) {
        onChange(orderId, newStatus);
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Статус шинэчлэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={loading}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-medium border-2",
            statusStyle[status]
          )}
        >
          {statusText[status]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
          Хүлээгдэж буй
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("delivered")}>
          Хүргэгдсэн
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("cancelled")}>
          Цуцалсан
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
