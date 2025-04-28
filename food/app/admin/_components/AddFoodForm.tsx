"use client";
import React, { useState, useRef } from "react";
import { AddFoodFormProps } from "./Types";
import axios from "axios"

export type FormData = {
  name: string;
  price: string;
  ingredients: string;
  img: FileList;
};

export const AddFoodForm = ({ onClose, categoryName }: AddFoodFormProps) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [img, setImg] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price && ingredients && img?.length) {
      try {
        await axios.post("http://localhost:3001/food", {
          foodName: data.name,
          price: data.price,
          
        })
      }
    }
  };

  const handleRemoveImage = () => {
    setImg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imgHave = !img || img.length === 0;

  return (
    <form
      onSubmit={onSubmit}
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
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Хоолны нэр"
            className="w-[194px] h-[34px] rounded-sm pl-[12px] py-[9px] border-[1px]"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[#09090B] text-[14px] font-medium">
            Хоолны үнэ
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Хоолны үнэ"
            className="w-[194px] h-[34px] rounded-sm pl-[12px] py-[9px] border-[1px]"
          />
        </div>
      </div>
      <div className="flex flex-col mb-[24px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Орц, найрлага
        </div>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Орц найрлага"
          className="w-full h-[90px] rounded-sm pl-[12px] py-[9px] border-[1px]"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[#09090B] text-[14px] font-medium">
          Хоолны зураг
        </div>
        {imgHave && (
          <input
            type="file"
            className="relative w-[416px] h-[138px] p-[12px] rounded-md mt-[12px] bg-[#7F7F800D] justify-start text-transparent z-10"
            ref={fileInputRef}
            onChange={(e) => setImg(e.target.files)}
          />
        )}
        {imgHave && (
          <div className="flex flex-col justify-center items-center absolute gap-[8px] right-[1020px] top-[670px] z-20">
            <img
              className="w-[32px] h-[32px] ml-[20px]"
              src="/Images/AddImage.png"
              alt="Add image"
            />
            <div className="text-[14px] font-medium">
              Choose a file or drag & drop it here
            </div>
          </div>
        )}
        <div className="flex relative justify-center mt-4">
          {img?.length && (
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
        <button
          type="submit"
          className="flex justify-center items-center bg-black text-white font-medium text-[14px] w-[93px] h-[40px] rounded-lg mt-[48px]"
        >
          Хоол нэмэх
        </button>
      </div>
    </form>
  );
};
