"use client" 
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"


const types = [
  "Appetizers", 
  "Salads", 
  "Pizzas", 
  "Lunch favorites", 
  "Main dishes", 
  "Fish & Sea foods", 
  "Side dish", 
  "Brunch", 
  "Desserts", 
  "Chicken", 
  "Toasts"
]

export const Categories = () => {
  return (
    <div className="flex flex-col px-[48px] py-[32px] gap-[36px] bg-[#404040]">
      <Link href={"/order"}>
      <div className="text-white text-[30px]"><b>Categories</b></div>
      </Link>
      <div className="px-[48px] pt-[36px] pb-[72px]">
        <Carousel>
          <CarouselContent className="">
            {types.map((item, index) => (
              <CarouselItem key={index} className="basis-auto pl-2">
                <Badge variant="outline" className="px-[20px] py-[4px] text-black bg-white hover:bg-[#EF4444] hover:text-white rounded-full text-[18px] font-[400]">{item}</Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
