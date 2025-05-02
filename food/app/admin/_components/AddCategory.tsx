"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner"
import { useState } from "react";
import { HashLoader } from "react-spinners";

type FormData = {
  name: string;
}

type AddFoodFormProps = {
  onClose: () => void
}

export const AddCategory = ({ onClose }: AddFoodFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await axios.post("http://localhost:3001/category", {
        categoryName: data.name,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      toast.success("Амжилттай нэмэгдлээ");
      onClose();
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error("Категори нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col w-[460px] h-fit p-[24px] bg-white rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between mb-[40px]">
        <div className="text-black text-[18px] font-semibold">
          Шинэ категори нэмэх
        </div>
        <button
          type="button"
          onClick={onClose}
          className="[#F4F4F5] w-[36px] h-[36px] rounded-full flex justify-center items-center text-[15px]"
        >
          x
        </button>
      </div>

      <div className="flex flex-col mb-[48px]">
        <div className="text-[14px] text-black font-medium">Категорийн нэр</div>
        <input
          {...register("name", {
            required: "Категорийн нэр хоосон байна",
          })}
          type="text"
          placeholder="Категорийн нэрээ оруулна уу"
          className="w-[412px] h-fit py-[12px] pl-[9px] border border-gray-300 rounded text-[14px]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-[16px]">
        <button
          type="button"
          onClick={onClose}
          className="flex px-[16px] py-[10px] text-black bg-white text-[16px] font-medium border border-gray-300 rounded-lg"
        >
          Хаах
        </button>
        <button
          type="submit"
          className="flex px-[16px] py-[10px] text-white bg-black text-[16px] font-medium rounded-lg"
        >
         {loading ? <HashLoader size={16}/> : "Нэмэх"} 
        </button>
      </div>
    </form>
  );
};
