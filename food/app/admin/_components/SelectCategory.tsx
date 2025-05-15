import { useEffect, useState } from "react";
import { Category } from "./Types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { api } from "@/axios";

type DropDownCategoryProps = {
  selectedCategory: string;
  categories: Category[];
  setSelectedCategory: (id: string) => void;
  handleCategorySelect: (id: string) => void;
  className?: string;
};

export const SelectCategory = ({
  selectedCategory,
  setSelectedCategory,
  handleCategorySelect,
}: DropDownCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await api.get(`/category`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Категори авах үед алдаа гарлаа", error);
      }
    };

    getAllCategories();
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        handleCategorySelect(value);
        setSelectedCategory(value);
      }}
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
          {categories.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.categoryName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
