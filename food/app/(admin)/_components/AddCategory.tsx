"use client";

import { AddFoodFormProps } from "./Types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

type FormData = {
  name: string;
};

export const AddCategory = ({ onClose, addCategory }: AddFoodFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3001/category", {
        categoryName: data.name,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      alert("Амжилттай нэмэгдлээ");
      addCategory();
      onClose();
      reset();
    } catch (error: any) {
      console.error(error);
      alert("Категори нэмэхэд алдаа гарлаа");
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
          className="bg-[#F4F4F5] w-[36px] h-[36px] rounded-full flex justify-center items-center text-[15px]"
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
          Нэмэх
        </button>
      </div>
    </form>
  );
};
