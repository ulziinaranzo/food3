"use client";
import { useEffect, useState } from "react";
import { LogoIcon } from "../assets/Logo";
import Link from "next/link";
import { useAuth } from "../_providers/AuthProvider";
import { HeaderLocationIcon } from "../assets/HeaderLocationIcon";
import { NextIcon } from "../assets/NextIcon";
import { HeaderCartIcon } from "../assets/HeaderCartIcon";
import { ProfileIcon } from "../assets/ProfileIcon";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("formData.email");
    setEmail(savedEmail);
  }, []);

  return (
    <div className="flex w-full bg-[#18181B] h-[68px] px-[88px] justify-between items-center">
      <div className="flex justify-center items-center gap-[12px]">
        <div className="w-[46px] h-[37.29px]">
          <LogoIcon />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="text-white text-[20px] font-[600]">Nom</div>
            <div className="text-[#EF4444] text-[20px] font-[600]">Nom</div>
          </div>
          <div className="text-white text-[12px] font-[400]">
            Swift delivery
          </div>
        </div>
      </div>
      <div className="flex items-center text-center justify-center gap-[12.81px]">
        {!user ? (
          <>
            <Link href="/auth/signup">
              <button className="flex items-center justify-center rounded-full px-[12px] py-[8px] bg-white text-black h-[36px]">
                Бүртгүүлэх
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="flex items-center justify-center rounded-full px-[12px] py-[8px] text-white bg-[#ef4445] h-[36px]">
                Нэвтрэх
              </button>
            </Link>
          </>
        ) : (
          <div className="flex gap-[12.81px]">
            <button className="w-[251px] h-[36px] flex justify-center items-center bg-white rounded-full px-[12px] py-[8px] gap-[4px]">
              <HeaderLocationIcon />
              <div className="text-[#EF4444] text-[12px] font-inter flex ">
                Хүргэлтийн хаяг:
              </div>
              <div className="text-[71717A] font-inter text-[12px] ml-[4px] flex ">
                Хаяг нэмэх
              </div>
              <NextIcon />
            </button>
            <button className="rounded-full w-[36px] h-[36px] flex justify-center items-center bg-[#F4F4F5]">
              <HeaderCartIcon />
            </button>
            <button className="bg-[#EF4444] rounded-full w-[36px] h-[36px] flex justify-center items-center">
              <ProfileIcon />
            </button>
            <div className="absolute top-[75px] right-[450px] flex flex-col rounded-lg p-[16px] bg-[white] text-[black] gap-[16px]">
              <div className="text-[20px] font-semibold">{email}</div>
              <button
                onClick={signOut}
                className="flex items-center justify-center rounded-full px-[8px] py-[8px] text-white bg-[#ef4445] h-[36px] "
              >
                Гарах
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
