import { Category } from "./Types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropDownCategoryProps = {
  selectedCategory: string;
  categories: Category[];
  setSelectedCategory: (id: string) => void;
  handleCategorySelect: (id: string) => void;
  className?: string;
};

export const SelectCategory = ({
  selectedCategory,
  categories,
  setSelectedCategory,
  handleCategorySelect,
}: DropDownCategoryProps) => {
  if (!Array.isArray(categories)) {
    return null;
  }
  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => handleCategorySelect(value)}
    >
      <SelectTrigger
        className={`w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px] flex items-center justify-between`}
      >
        <SelectValue
          placeholder={
            selectedCategory
              ? categories.find((cat) => cat._id === selectedCategory)
                  ?.categoryName
              : "Категори сонгоно уу"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.isArray(categories) &&
            categories.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {item.categoryName}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
