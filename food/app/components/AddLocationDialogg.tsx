"use client"
export const AddLocationDialogg = () => {
    return (
        <dialog open className="fixed top-[50%] left-[50%] bg-white rounded-lg shadow-lg">
  <div className="w-[480px] h-[308px] p-[24px]">
    <div className="flex justify-between mb-[24px]">
      <div className="text-[#09090B] text-[18px] font-[600]">Хүргэлтийн хаяг</div>
      <button className="w-[36px] h-[36px] rounded-full flex justify-center items-center bg-[#F4F4F5] text-[#18181B] text-[18px]">x</button>
    </div>
    <textarea
      placeholder="Барилгын дугаар, орц, орон сууцны дугаар зэрэг тодорхой хаягийн мэдээллийг оруулна уу"
      className="w-[432px] h-[112px] rounded-lg px-[8px] py-[12px] resize-none"
    />
    <div className="flex justify-end gap-[16px] mt-[30px]">
      <button className="px-[16px] py-[12px] bg-white border border-[#E4E4E7] rounded-full text-sm">
        Буцах
      </button>
      <button className="px-[16px] py-[12px] bg-black text-white rounded-full text-sm">
        Оруулах
      </button>
    </div>
  </div>
</dialog>
    )
}