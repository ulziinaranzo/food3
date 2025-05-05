"use client"
export const AddLocationDialog = () => {
    return (
        <dialog open className="flex flex-col absolute top-[500px] left-[500px] bg-white rounded-lg justify-center items-center w-[664px] h-[320px] gap-[40px]">
        <div className="text-[#09090B] text-[24px] font-[600] mt-[24px]">
          Хүргэлт хийлгэх хаягаа сонгоно уу
        </div>
        <img src="/Images/naizuud.png" className="w-[142px] h-[116px]" />
        <button className="w-[134px] h-[44px] rounded-full flex justify-center items-center text-[14px] font-[500] text-[#18181B] bg-[#F4F4F5]">
          Хаах
        </button>
      </dialog>
    )
}