"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "../assets/Logo";
import { FoodMenuIcon } from "../assets/FoodMenuIcon";
import { FoodMenuIconWhite } from "../assets/FoodMenuIconWhite";
import { OrderIconBlack } from "../assets/OrderIconBlack";
import { OrderIcon } from "../assets/OrderIcon";
import { SettingsIcon } from "../assets/SettingsIcon";
import { LogOut } from "lucide-react";
import { useAuth } from "@/app/_providers/AuthProvider";
import { Toaster } from "sonner";

function SidebarButton({
  href,
  icon,
  activeIcon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <button
        className={`flex items-center gap-2 whitespace-nowrap w-full text-left px-4 py-2 rounded-full transition-colors
          ${
            isActive
              ? "bg-black text-white"
              : "text-black hover:bg-black hover:text-white"
          }`}
        type="button"
      >
        {isActive ? activeIcon : icon}
        {label}
      </button>
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Гарахад алдаа гарлаа:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="flex flex-col bg-white h-full w-[220px] pt-[36px] p-[20px] justify-between">
        <div className="flex flex-col gap-[40px]">
          <Link href={"/"}>
            <div className="flex gap-[12px] cursor-pointer">
              <div className="w-[46px] h-[37.29px]">
                <LogoIcon />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="text-black text-[20px] font-[600]">Nom</div>
                  <div className="text-[20px] font-[600] text-[#EF4444]">
                    Nom
                  </div>
                </div>
                <div className="text-[#71717A] text-[12px] font-[400]">
                  Swift delivery
                </div>
              </div>
            </div>
          </Link>

          <nav className="flex flex-col gap-4">
            <SidebarButton
              href="/admin/foodmenu"
              icon={<FoodMenuIcon />}
              activeIcon={<FoodMenuIconWhite />}
              label="Хоолны цэс"
            />
            <SidebarButton
              href="/admin/orders"
              icon={<OrderIconBlack />}
              activeIcon={<OrderIcon />}
              label="Захиалгууд"
            />
            <SidebarButton
              href="/admin/settings"
              icon={<SettingsIcon />}
              activeIcon={<SettingsIcon />}
              label="Засвар"
            />
          </nav>
        </div>

        {/* 🔴 Гарах товч */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
          type="button"
        >
          <LogOut className="w-4 h-4" />
          Гарах
        </button>
      </aside>

      <main className="flex-1 bg-[#E4E4E7] overflow-y-auto h-full p-4">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
