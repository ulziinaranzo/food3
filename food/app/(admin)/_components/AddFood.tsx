export const AddFood = ({ category }) => {
  return (
    <div className="flex flex-col p-[24px] w-[460px] h-[592px] bg-white ">
      <div className="flex justify-between pb-[40px]">
        <div className="text-[18px] font-semibold">шинэ хоол нэмэх</div>
        <button className="w-[36px] h-[36px] rounded-full bg-[#F4F4F5]">
          X
        </button>
      </div>
      <div className="flex gap-[24px] mb-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="text-[#09090B] text-[14px] font-medium">
            Хоолны нэр
          </div>
          <input
            placeholder="Хоолны нэр"
            className="w-[194px] h-[34px] rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[#09090B] text-[14px] font-medium">
            Хоолны үнэ
          </div>
          <input
            placeholder="Хоолны үнэ"
            className="w-[194px] h-[34px] rounded-sm"
          />
        </div>
      </div>
      <div className="flex flex-col mb-[24px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Орц, найрлага
        </div>
        <input
          placeholder="Орц найрлагаа оруулна уу"
          className="w-full h-[90px] rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Хоолны зураг
        </div>
        <input
          type="file"
          className="relative w-[416px] h-[44px] p-[12px] rounded-md mt-[12px] bg-[#7F7F800D]"
        />
        <div className="flex flex-col absolute gap-[8px] right-[200px] top-[200px]">
          <img className="w-[28px] h-[28px] ml-[20px]" />
          <div className="text-[14px] font-medium">Add image</div>
        </div>
        {errors.img && (
          <div className="text-red-600 text-sm">{errors.img.message}</div>
        )}

        <div className="flex justify-center mt-4">
          {img?.length > 0 && (
            <img
              className="w-full h-[200px] object-cover rounded-[10px]"
              src={URL.createObjectURL(img[0])}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button className="flex justify-center items-center bg-black text-white font-medium text-[14px] w-[93px] h-[40px]">
          Хоол нэмэх
        </button>
      </div>
    </div>
  );
};
