"use client";
import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AddFoodFormProps } from "./Types";

export type FormData = {
  name: string;
  price: string;
  ingredients: string;
  img: FileList;
};

export const AddFoodForm = ({ onClose, categoryName }: AddFoodFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();

  const img = watch("img");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Data nemegdlee", data);
    alert("Амжилттай нэмэгдлээ");
  };

  const handleRemoveImage = () => {
    setValue("img", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imgHave = img?.length === 0 || img === undefined || img === null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-[24px] w-[460px] h-fit bg-white rounded-lg"
    >
      <div className="flex justify-between pb-[40px]">
        <div className="text-[18px] font-semibold">
          {categoryName} категорид шинэ хоол нэмэх
        </div>
        <button
          type="button"
          className="w-[36px] h-[36px] rounded-full bg-[#F4F4F5] text-[12px]"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="flex gap-[24px] mb-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="text-[#09090B] text-[14px] font-medium">
            Хоолны нэр
          </div>
          <input
            {...register("name", { required: "Хоолны нэр хоосон байна" })}
            type="text"
            placeholder="Хоолны нэр"
            className="w-[194px] h-[34px] rounded-sm pl-[12px] py-[9px] border-[1px]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[#09090B] text-[14px] font-medium">
            Хоолны үнэ
          </div>
          <input
            {...register("price", {
              required: "Хоолны үнэ хоосон байна",
              pattern: {
                value: /^[0-9]+$/,
                message: "Үнэ зөвхөн тоо байж болно",
              },
            })}
            placeholder="Хоолны үнэ"
            className="w-[194px] h-[34px] rounded-sm pl-[12px] py-[9px] border-[1px]"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col mb-[24px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Орц, найрлага
        </div>
        <input
          {...register("ingredients", {
            required: "Орц найрлага хоосон байна",
          })}
          placeholder="Орц найрлагаа оруулна уу"
          className="w-full h-[90px] rounded-sm pl-[12px] py-[9px] border-[1px]"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Хоолны зураг
        </div>
        {imgHave && (
          <input
            {...register("img", { required: "Зураг шаардлагатай" })}
            type="file"
            className="relative w-[416px] h-[138px] p-[12px] rounded-md mt-[12px] bg-[#7F7F800D] justify-start text-transparent z-10"
            ref={(e) => {
              register("img").ref(e);
              fileInputRef.current = e;
            }}
          />
        )}

        {imgHave && (
          <div className="flex flex-col justify-center items-center absolute gap-[8px] right-[900px] top-[550px] z-20">
            <img
              className="w-[32px] h-[32px] ml-[20px]"
              src="/Images/AddImage.png"
            />
            <div className="text-[14px] font-medium">
              Choose a file or drag & drop it here
            </div>
          </div>
        )}

        {errors.img && (
          <div className="text-red-600 text-sm">{errors.img.message}</div>
        )}

        <div className="flex relative justify-center mt-4">
          {img?.length > 0 && (
            <>
              <img
                className="w-full h-[138px] object-cover rounded-[10px]"
                src={URL.createObjectURL(img[0])}
                alt="preview"
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-[12px] flex justify-center items-center bg-[#E4E4E7] w-[28px] h-[28px] rounded-full"
                onClick={handleRemoveImage}
              >
                x
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button className="flex justify-center items-center bg-black text-white font-medium text-[14px] w-[93px] h-[40px] rounded-lg mt-[48px]">
          Хоол нэмэх
        </button>
      </div>
    </form>
  );
};
