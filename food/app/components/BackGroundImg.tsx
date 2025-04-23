"use client";

import Link from "next/link";

export const BackgroundPic = () => {
  return (
    <Link href={"/foodmenu"}>
      <div className="w-[1440px] h-[570px]">
        <img src="/Images/homepage-cover.png" />
      </div>
    </Link>
  );
};
