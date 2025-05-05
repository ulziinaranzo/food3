"use client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export interface CategoryListProps {
  selectedCategory: string | null;
  categories: { _id: string; categoryName: string }[];
  handleCategorySelect: (value: string) => void;
}
interface CategoriesProps {
  selectedCategory: string | null;
  categories: { _id: string; categoryName: string }[];
  handleCategorySelect: (value: string) => void;
  setFilteredCategories: (value: boolean) => void;
}
export const Categories = ({
  categories,
  selectedCategory,
  handleCategorySelect,
  setFilteredCategories,
}: CategoriesProps) => {
  return (
    <div className="flex flex-col px-[48px] pt-[32px] gap-[36px]">
      <div className="text-white text-[30px] ml-[35px]">
        <b>Categories</b>
      </div>
      <div className="px-[48px] pt-[36px] pb-[72px]">
        <Carousel>
          <CarouselContent>
            {categories?.map((item, index) => (
              <CarouselItem key={item._id} className="basis-auto pl-2">
                <Badge
                  variant="outline"
                  className="px-[20px] py-[4px] text-black bg-white hover:bg-[#EF4444] border-none hover:text-white rounded-full text-[18px] font-[400]"
                  onClick={() => {
                    handleCategorySelect(item._id);
                    setFilteredCategories(true);
                  }}
                >
                  {item.categoryName}
                </Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent text-white border-none" />
          <CarouselNext className="bg-transparent text-white border-none" />
        </Carousel>
      </div>
    </div>
  );
};
