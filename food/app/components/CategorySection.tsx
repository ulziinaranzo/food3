"use client"

import { AddIcon } from "../assets/AddIcon";

const categoryDetails = [
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
  {
    img: "/images/Product-Image.png", 
    name: "Finger Food",
    overview: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    price: "$12.99"
  },
];

export const CategorySection = () => {
  return (
    <div className="w-full h-fit flex flex-col px-[88px] pb-[54px] gap-[54px] bg-[#404040]">
      <div className="text-white font-[600] text-[30px]">Appetizer</div>
      <div className="grid grid-cols-3 gap-[36px]">
        {categoryDetails.map((item, index) => (
          <div key={index} className="flex flex-col p-4 gap-5 bg-white rounded-lg shadow-lg relative">
            <img 
              src={item.img}
              alt={item.name}
              className="w-full h-[210px] object-cover rounded-t-lg"
            />
            <button className="w-[44px] h-[44px] flex items-center justify-center absolute right-[36px] top-[163px] bg-white z-10 rounded-full cursor-pointer"><AddIcon/></button>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="font-[600] text-[24px] text-[#EF4444]">{item.name}</div>
                <div className="font-[600] text-[18px] text-[#09090B]">{item.price}</div>
              </div>
              <div className="text-[14px] font-[400] text-[#09090B]">
                {item.overview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}