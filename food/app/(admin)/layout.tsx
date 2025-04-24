'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoIcon } from '../assets/Logo';
import { FoodMenuIcon } from '../assets/FoodMenuIcon';
import { FoodMenuIconWhite } from '../assets/FoodMenuIconWhite';
import { OrderIconBlack } from '../assets/OrderIconBlack';
import { OrderIcon } from '../assets/OrderIcon';
import { SettingsIcon } from '../assets/SettingsIcon';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex">
      <aside className="flex flex-col bg-white h-screen w-[220px] pt-[36px] p-[20px] gap-[40px]">
        <div className="flex gap-[12px]">
          <div className="w-[46px] h-[37.29px]">
            <LogoIcon />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-black text-[20px] font-[600]">Nom</div>
              <div className="text-[14px] font-[600] text-[#EF4444]">Nom</div>
            </div>
            <div className="text-[#71717A] text-[12px] font-[400]">Swift delivery</div>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          <Link href="/foodmenu">
            <button
              className={`flex items-center gap-2 whitespace-nowrap w-full text-left px-4 py-2 rounded-full transition-colors
                ${pathname === '/food-menu' ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white'}`}
            >
              {pathname === '/food-menu' ? <FoodMenuIconWhite /> : <FoodMenuIcon />}
              Хоолны цэс
            </button>
          </Link>
          <Link href="/orders">
            <button
              className={`flex items-center gap-2 whitespace-nowrap w-full text-left px-4 py-2 rounded-full transition-colors
                ${pathname === '/orders' ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white'}`}
            >
              {pathname === '/orders' ? <OrderIcon /> : <OrderIconBlack />}
              Захиалгууд
            </button>
          </Link>
          <Link href="/settings">
            <button
              className={`flex items-center gap-2 whitespace-nowrap w-full text-left px-4 py-2 rounded-full transition-colors
                ${pathname === '/settings' ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white'}`}
            >
             <SettingsIcon />
              Засвар
            </button>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-[#E4E4E7]">{children}</main>
    </div>
  );
}
