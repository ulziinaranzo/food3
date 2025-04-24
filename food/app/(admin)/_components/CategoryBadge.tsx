"use client";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  label: string;
  count: number;
  isActive?: boolean;
  onClick: () => void;
}

export default function CategoryBadge({
  label,
  count,
  isActive = false,
  onClick,
}: CategoryBadgeProps) {
  return (
    <Badge
      onClick={onClick}
      className={`px-[16px] py-[8px] text-[14px] font-[400] border-[1px] rounded-full cursor-pointer flex items-center
        ${isActive ? "bg-[#EF4444] text-white" : "bg-white text-black hover:bg-[#EF4444] hover:text-white"} border-[#E4E4E7]`}
    >
      {label}
      <Badge className="ml-2 px-[10px] py-[2px] bg-[#18181B] text-white text-[12px] font-semibold rounded-full">
        {count}
      </Badge>
    </Badge>
  );
}
