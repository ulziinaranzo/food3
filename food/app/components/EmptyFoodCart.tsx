"use client";

export const EmptyFoodCart = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[182px] rounded-lg bg-[#71717A] pt-[32px] py-[48px] gap-[4px]">
      <img src="/Images/9374373.png" className="w-[61px] h-[50px]" />
      <div className="text-[18px] font-bold text-[black]">
        Сагс хоосон байна
      </div>
      <div className="text-[#71717A] text-[12px] font-regular">
        ❤️ Хүссэн хоолоо захиалаад хүргүүлээд аваарай! 🍔{" "}
      </div>
    </div>
  );
};
