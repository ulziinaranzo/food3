"use client";

type EmptyFoodCartProps= {
  setOpen: (open: boolean) => void;
}
export const EmptyFoodCart = ({setOpen}: EmptyFoodCartProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[240px] rounded-2xl bg-white shadow-md p-8 gap-3 animate-fade-in">
      <img
        src="/Images/9374373.png"
        alt="Empty Cart"
        className="w-[80px] h-[80px] opacity-80 mt-[30px]"
      />
      <div className="text-[20px] font-semibold text-gray-800">
        Таны сагс хоосон байна
      </div>
      <div className="text-center text-gray-500 text-[14px] px-6">
        ❤️ Хүссэн хоолоо сонгоод захиалгаа үүсгээрэй! 🍔
      </div>
      <button className="mt-4 px-6 py-2 bg-[#EF4444] text-white rounded-full hover:bg-[#dc2626] transition"
      onClick={() => {setOpen(false)}}>
        Хоол захиалах
      </button>
    </div>
  );
};
