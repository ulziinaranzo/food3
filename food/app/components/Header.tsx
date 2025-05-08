"use client";
import { useEffect, useState } from "react";
import { LogoIcon } from "../assets/Logo";
import Link from "next/link";
import { useAuth } from "../_providers/AuthProvider";
import { HeaderLocationIcon } from "../assets/HeaderLocationIcon";
import { NextIcon } from "../assets/NextIcon";
import { HeaderCartIcon } from "../assets/HeaderCartIcon";
import { ProfileIcon } from "../assets/ProfileIcon";
import { AddLocationDialog } from "./AddLocationDialogg";
import { OrderDetail } from "./OrderDetail";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [locatioDialog, setLocationDialog] = useState(false);
  const [foodOrderOpen, setFoodOrderOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const address = user?.address || "";

  useEffect(() => {
    const savedEmail = localStorage.getItem("formData.email");
    setEmail(savedEmail);
  }, []);

  return (
    <div className="flex w-full bg-[#18181B] h-[68px] px-[88px] justify-between items-center relative z-50">
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

      <div className="flex items-center text-center justify-center gap-[12.81px] relative">
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
          <div className="flex items-center gap-[12.81px] relative">
            <button
              className="w-[251px] h-[36px] flex justify-center items-center bg-white rounded-full px-[12px] py-[8px] gap-[4px]"
              onClick={() => setLocationDialog(true)}
            >
              <HeaderLocationIcon />
              <div className="text-[#EF4444] text-[12px] font-inter flex">
                Хүргэлтийн хаяг:
              </div>
              <div className="text-[#71717A] font-inter text-[12px] ml-[4px] flex">
                {address || "Хаяг нэмэх"}
              </div>
              <NextIcon />
            </button>
            <AddLocationDialog open={locatioDialog} setOpen={setLocationDialog} user={user} address={address}/>

            <button
              className="rounded-full w-[36px] h-[36px] flex justify-center items-center bg-[#F4F4F5]"
              onClick={() => setFoodOrderOpen(true)}
            >
              <HeaderCartIcon />
            </button>
            <OrderDetail open={foodOrderOpen} setOpen={setFoodOrderOpen} />

            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="bg-[#EF4444] rounded-full w-[36px] h-[36px] flex justify-center items-center"
              >
                <ProfileIcon />
              </button>

              {showProfileDropdown && (
                <div className="absolute top-[45px] right-0 flex flex-col rounded-lg p-[16px] bg-white text-black gap-[16px] shadow-lg z-50">
                  <div className="text-[20px] font-semibold">{user.email}</div>
                  <Link href={`/user?id=${user._id}`}>
                    <button className="text-left text-[black] hover:underline border-[1px] border-[#ef4445] px-[12px] py-[7px] rounded-full w-full flex justify-center opacity-90">
                      Хувийн мэдээлэл
                    </button>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center justify-center rounded-full px-[8px] py-[8px] text-white bg-[#ef4445] h-[36px]"
                  >
                    Гарах
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
