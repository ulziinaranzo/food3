"use client"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form";

type AddFoodFormProps= {
    category: string;
    onClose: () => void
}
type FormData = {
    name: string;
    price: string;
    ingredients: string;
    img: FileList
} 

export const AddFoodForm = ({ category, onClose }: AddFoodFormProps) => {
    const {
        register, 
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>
    
    const img = watch("img")
    const onSubmit = (data: FormData) => {
        console.log("Data nemegdlee", data)
        alert("Амжилттай нэмэгдлээ")
    }
    return (
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-[24px] w-[460px] h-[592px] bg-white ">
        <div className="flex justify-between pb-[40px]">
          <div className="text-[18px] font-semibold">шинэ хоол нэмэх</div>
          <button className="w-[36px] h-[36px] rounded-full bg-[#F4F4F5]" onClick={() => {onClose}}>
            X
          </button>
        </div>
        <div className="flex gap-[24px] mb-[24px]">
          <div className="flex flex-col gap-[8px]">
            <div className="text-[#09090B] text-[14px] font-medium">
              Хоолны нэр
            </div>
            <input
            {...register("name", { required: "Хоолны нэр хоосон байна"})}
            type="file"
              placeholder="Хоолны нэр"
              className="w-[194px] h-[34px] rounded-sm"
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
            {...register("price", {required: "Хоолны үнэ хоосон байна"})}
              placeholder="Хоолны үнэ"
              className="w-[194px] h-[34px] rounded-sm"
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
          {...register("ingredients", {required: "Орц найрлага хоосон байна"})}
            placeholder="Орц найрлагаа оруулна уу"
            className="w-full h-[90px] rounded-sm"
          />
          {errors.ingredients && (
            <p>{errors.ingredients.message}</p>
          )}
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