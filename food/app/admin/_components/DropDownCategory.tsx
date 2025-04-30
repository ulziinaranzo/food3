import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropDownCategoryProps {
  selectedCategory: string | null;
  categories: { _id: string; categoryName: string }[];
  setSelectedCategory: (value: string) => void;
  handleCategorySelect: (value: string) => void;
  className?: string;
}

export const DropdownCategory = ({
  selectedCategory,
  categories,
  setSelectedCategory,
  handleCategorySelect,
}: DropDownCategoryProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px] flex items-center justify-between">
        <span className="text-[#71717A]">
          {selectedCategory
            ? categories.find((cat) => cat._id === selectedCategory)
                ?.categoryName
            : "Категори сонгох"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((item) => (
          <DropdownMenuItem
            key={item._id}
            onClick={() => handleCategorySelect(item._id)}
            className={selectedCategory === item._id ? "bg-gray-100" : ""}
          >
            {item.categoryName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
