"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AddFoodFormProps, FormValues } from "./Types";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";


export const AddFoodForm = ({ onClose, categoryName, getFoods }: AddFoodFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();
  const imgUrl = watch("imgUrl");
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (!data.foodName || !data.price || !data.ingredients || !data.imgUrl) {
      toast.error("Бүх хэсгийг бөглөнө үү");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/food", { ...data, categoryName });
      toast.success("Амжилттай нэмэгдлээ");
      onClose();
      await getFoods();
    } catch {
      toast.error("Хоол нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue("imgUrl", url);
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setValue("imgUrl", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 w-[460px] bg-white rounded-lg">
      <div className="flex justify-between mb-10">
        <div className="text-lg font-semibold">{categoryName} категорид шинэ хоол нэмэх</div>
        <button type="button" onClick={onClose} className="w-9 h-9 rounded-full bg-[#F4F4F5] text-sm">X</button>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Хоолны нэр</label>
          <input {...register("foodName")} type="text" placeholder="Хоолны нэр" className="w-48 h-9 pl-3 border rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Хоолны үнэ</label>
          <input {...register("price")} type="text" placeholder="Хоолны үнэ" className="w-48 h-9 pl-3 border rounded" />
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium">Орц, найрлага</label>
        <input {...register("ingredients")} type="text" placeholder="Орц найрлага" className="h-[90px] pl-3 border rounded" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Хоолны зураг</label>
        {!preview && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageSelect}
              className="w-full h-[138px] p-3 bg-[#7F7F800D] text-transparent"
            />
            <div className="absolute right-[1020px] top-[610px] flex flex-col items-center gap-2 z-10">
              <img src="/Images/AddImage.png" className="w-8 h-8" />
              <div className="text-sm font-medium">Choose or drag image</div>
            </div>
          </>
        )}
        {preview && (
          <div className="relative mt-4">
            <img src={preview} className="w-full h-[138px] object-cover rounded" />
            <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-[#E4E4E7] w-7 h-7 text-sm rounded-full flex items-center justify-center">x</button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="mt-12 w-[93px] h-10 rounded-lg bg-black text-white flex justify-center items-center text-sm font-medium">
          {loading ? <HashLoader size={16} color="white" /> : "Хоол нэмэх"}
        </button>
      </div>
    </form>
  );
};
