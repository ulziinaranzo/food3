import { PlusIcon } from "@/app/assets/PlusIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddFoodForm } from "./AddFoodForm";

type AddFoodCardProps = {
  selectedCategoryName: string;
  categoryId: string;
  onUpdate: () => void;
};

export default function AddFoodCard({
  selectedCategoryName,
  categoryId,
  onUpdate,
}: AddFoodCardProps) {
  const label = selectedCategoryName
    ? `${selectedCategoryName} цэсэнд хоол нэмэх`
    : "Шинэ хоол нэмэх";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-[24px] items-center justify-center border-dashed border-[#EF4444] border-[2px] h-[241px] w-[250px] rounded-lg text-[#EF4444] text-[14px] font-medium cursor-pointer hover:bg-[#fef2f2]">
          <button className="w-[36px] h-[36px] flex justify-center items-center bg-[#EF4444] rounded-full text-white mt-[2px]">
            <div className="w-[16px] h-[16px]">
              <PlusIcon />
            </div>
          </button>
          {label}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-lg font-semibold">
              {selectedCategoryName} категорид шинэ хоол нэмэх
            </div>
          </DialogTitle>
          <DialogDescription>
            Хоолны мэдээллийг бүрэн бөглөнө үү
          </DialogDescription>
        </DialogHeader>

        <AddFoodForm
          categoryName={selectedCategoryName}
          categoryId={categoryId}
          onUpdate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
