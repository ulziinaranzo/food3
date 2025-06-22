"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./Types";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api, setAuthToken } from "@/axios";

type AddFoodFormProps = {
  categoryName: string;
  categoryId: string;
  onUpdate: () => void;
};
const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "dxhmgs7wt";

export const AddFoodForm = ({
  categoryName,
  categoryId,
  onUpdate,
}: AddFoodFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deployedImg, setDeployedImg] = useState("");
  const { user } = useAuth();

  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `http://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.url;
    } catch (error) {
      toast.error("Зураг deploy хийхэд алдаа гарлаа");
      console.error("Зураг deploy хийхэд алдаа гарлаа", error);
    }
  };

  const handleUpload = async (file: File) => {
    const uploadedUrl = await uploadImage(file);
    console.log(uploadedUrl);

    if (uploadedUrl) {
      setDeployedImg(uploadedUrl);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.foodName || !data.price || !data.ingredients || !data.imgUrl) {
      toast.error("Бүх хэсгийг бөглөнө үү");
      return;
    }
    setLoading(true);
    console.log(data);
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);
      await api.post(`/food`, {
        ...data,
        image: deployedImg,
        category: categoryId,
      });
      toast.success("Амжилттай нэмэгдлээ");
      onUpdate();
    } catch {
      toast.error("Хоол нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      await handleUpload(file);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-6 bg-white rounded-lg"
    >
      <div className="flex gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Хоолны нэр</label>
          <input
            {...register("foodName")}
            type="text"
            placeholder="Хоолны нэр"
            className="w-48 h-9 pl-3 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Хоолны үнэ</label>
          <input
            {...register("price")}
            type="text"
            placeholder="Хоолны үнэ"
            className="w-48 h-9 pl-3 border rounded"
          />
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium">Орц, найрлага</label>
        <input
          {...register("ingredients")}
          type="text"
          placeholder="Орц найрлага"
          className="h-[90px] pl-3 border rounded"
        />
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
            <div className="absolute right-[180px] top-[400px] flex flex-col items-center gap-2 z-10">
              <img src="/Images/AddImage.png" className="w-8 h-8" />
              <div className="text-sm font-medium">Choose or drag image</div>
            </div>
          </>
        )}
        {preview && (
          <div className="relative mt-4">
            <img
              src={preview}
              className="w-full h-[138px] object-cover rounded"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 left-100 bg-[#E4E4E7] w-7 h-7 text-sm rounded-full flex items-center justify-center"
            >
              x
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-12 w-[93px] h-10 rounded-lg bg-black text-white flex justify-center items-center text-sm font-medium"
        >
          {loading ? <HashLoader size={16} /> : "Хоол нэмэх"}
        </button>
      </div>
    </form>
  );
};
