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
import axios from "axios";
import { useState, useEffect } from "react";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      console.log("API response:", response.data);
      const categories = response.data.categories;
      setCategories(categories);
      console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col px-[48px] py-[32px] gap-[36px] bg-[#404040]">
      <Link href={"/order"}>
        <div className="text-white text-[30px]">
          <b>Categories</b>
        </div>
      </Link>
      <div className="px-[48px] pt-[36px] pb-[72px]">
        <Carousel>
          <CarouselContent>
            {categories?.map((item, index) => (
              <CarouselItem key={index} className="basis-auto pl-2">
                <Badge
                  variant="outline"
                  className="px-[20px] py-[4px] text-black bg-white hover:bg-[#EF4444] hover:text-white rounded-full text-[18px] font-[400]"
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
