"use client";
import { useEffect, useState } from "react";
import { LogoIcon } from "../assets/Logo";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex w-max-[1440px] bg-[#18181B] h-[68px] pr-[88px] pl-[88px] justify-between ">
      <div className="flex justify-center items-center gap-[12px]">
        <div className="w-[46px] h-[37.29px]">
          <LogoIcon />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="text-white text-[20px] font-[600]">Nom</div>
            <div className="text- text-[20px] font-[600] text-[#EF4444]">
              Nom
            </div>
          </div>
          <div className="text-white text-[12px] font-[400]">
            Swift delivery
          </div>
        </div>
      </div>
      <div className="flex items-center text-center justify-center gap-[12.81px] ">
        <Link href={"/auth/signup"}>
          <button className="flex items-center justify-center rounded-full px-[12px] py-[8px] bg-white text-black h-[36px]">
            Sign Up
          </button>
        </Link>
        <Link href={"/auth/login"}>
          <button className="flex items-center justify-center rounded-full px-[12px] py-[8px] text-white bg-[#ef4445] h-[36px]">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};
