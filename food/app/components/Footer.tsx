"use client"

import { LogoIcon } from "../assets/Logo"

export const Footer = () => {
  return (
    <div className="flex flex-col w-max-[1440px] h-fit pt-[60px] pb-[111px] bg-[#18181B]">
      <div className="flex w-full bg-[#EF4444] pl-[98px] pt-[28px] pb-[28px] gap-[34px] overflow-hidden">
        <div className="whitespace-nowrap animate-marquee font-[600] text-[30px] text-[#FAFAFA]">
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} className="mr-[60px] inline-block">
              Fresh fast delivered
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-[76px] mb-[104px]">
        <div className="flex pl-[88px] pr-[88px]">
          <div className="flex flex-col">
            <LogoIcon />
            <div className="flex">
              <div className="text-white text-[20px] font-[600]">Nom</div>
              <div className="text-[20px] font-[600] bg-[#ef4445]">Nom</div>
            </div>
            <div className="text-white text-[12px] font-[400]">Swift delivery</div>
          </div>
          <div className="ml-[220px] flex flex-col gap-[16px]">
            <div className="text-[#71717A] text-[16px] font-[400] hover:underline">NOMNOM</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Home</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Contact us</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Delivery zone</div>
          </div>
          <div className="flex flex-col gap-[16px] ml-[112px]">
            <div className="text-[#71717A] text-[16px] font-[400] hover:underline">MENU</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Appetizers</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Salads</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Pizzas</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Lunch favorites</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Main dishes</div>
          </div>
          <div className="flex flex-col mt-[44px] gap-[16px] ml-[56px]">
            <div className="text-white text-[16px] font-[400] hover:underline">Side dish</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Brunch</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Desserts</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Beverages</div>
            <div className="text-white text-[16px] font-[400] hover:underline">Fish & Sea foods</div>
          </div>
          <div className="flex flex-col gap-[16px] ml-[112px]">
            <div className="flex text-[#71717A] text-[16px] font-[400]">FOLLOW US</div>
            <div className="flex gap-[16px]">
              <img className="w-[28px] h-[28px]" src="/Images/FacebookIcon.png" />
              <img className="w-[28px] h-[28px]" src="/Images/Instagram.png" />
            </div>
          </div>
        </div>

        <div className="flex text-[#71717A] ml-[88px] text-[14px] font-[400] gap-[48px] pt-[32px] border-t-1 border-[#F4F4F566] mt-[104px] w-[1264px]">
          <div>Copy right 2024 © Nomnom LLC</div>
          <div>Privacy policy</div>
          <div>Terms and conditions</div>
          <div>Cookie policy</div>
        </div>
      </div>
    </div>
  );
};
