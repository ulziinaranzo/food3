import { PlusIcon } from "@/app/assets/PlusIcon";

type AddFoodCardProps = {
    selectedCategoryName?: string | null;
    onClick?: () => void
}

export default function AddFoodCard({selectedCategoryName, onClick}: AddFoodCardProps) {
    const label = selectedCategoryName ? `${selectedCategoryName} цэсэнд хоол нэмэх` : "Шинэ хоол нэмэх"
return (
    <div
    onClick={onClick}
    className="flex flex-col gap-[24px] items-center justify-center border-dashed border-[#EF4444] border-[2px] h-[241px] w-[250px] rounded-lg text-[#EF4444] text-[14px] font-medium cursor-pointer hover:bg-[#fef2f2]"
  >
    <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
      <PlusIcon className="w-[16px] h-[16px]" />
    </button>
    {label}
  </div>
)

}