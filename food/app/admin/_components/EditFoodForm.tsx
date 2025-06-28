"use client";
import { useRef, useState, useEffect } from "react";
import { Category, Food, FormValues } from "./Types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "@/app/assets/EditIcon";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { TrashIcon } from "@/app/assets/TrashIcon";
import { toast } from "sonner";
import { SelectCategory } from "./SelectCategory";
import { DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api, setAuthToken } from "@/axios";

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "dfjv83cxe";

export type EditFoodFormProps = {
  onClose: () => void;
  categoryName: string;
  categories: Category[];
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
  foodData: Food;
  onUpdate: () => void;
  onDelete: (foodId: string) => void;
};

export const EditFoodForm = ({
  categoryName,
  categories,
  setSelectedCategory,
  selectedCategory,
  foodData,
  onUpdate,
  onDelete,
}: EditFoodFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      foodName: foodData.foodName,
      price: foodData.price,
      ingredients: foodData.ingredients,
      imgUrl: Array.isArray(foodData.image)
        ? foodData.image[0]
        : foodData.image,
      category: foodData.category,
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const uploadImg = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await axios.put(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.url;
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadImg(file);
    if (uploadedUrl) {
      setPreview(uploadedUrl);
      setValue("imgUrl", uploadedUrl);
    }
  };

  useEffect(() => {
    if (foodData) {
      const initialImg = Array.isArray(foodData.image)
        ? foodData.image[0]
        : foodData.image;
      setPreview(initialImg);
      setValue("price", foodData.price);
      setValue("category", foodData.category);
      setValue("ingredients", foodData.ingredients);
      setValue("imgUrl", initialImg);
    }
  }, [foodData]);

  const onSubmit = async (data: FormValues) => {
    if (!data.foodName || !data.price || !data.ingredients || !data.imgUrl) {
      toast.error("Бүх хэсгийг бөглөнө үү");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);
      await api.put(`/food/${foodData._id}`, {
        ...data,
        image: data.imgUrl,
        categoryName: selectedCategory,
      });
      await onUpdate();
      toast.success("Амжилттай шинэчлэгдлээ");
    } catch {
      toast.error("Хоол шинэчлэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
      setValue("category", categoryId);
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setValue("imgUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[36px] h-[36px] flex items-center justify-center absolute right-[12px] top-[120px] bg-white z-10 rounded-full cursor-pointer shadow-md"
        >
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[484px]">
        <DialogHeader>
          <DialogTitle>Хоолны мэдээлэл</DialogTitle>
          <DialogDescription>
            Энд хоолны дэлгэрэнгүй мэдээллийг засварлах боломжтой.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="foodName">Хоолны нэр</Label>
              <Input
                {...register("foodName", { required: true })}
                id="foodName"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="gap-[3px]">Хоолны категори</Label>
              <SelectCategory
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                categories={categories}
                handleCategorySelect={handleCategorySelect}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients">Орц</Label>
              <Input
                {...register("ingredients")}
                id="ingredients"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="price">Үнэ</Label>
              <Input
                {...register("price", { required: true })}
                id="price"
                type="number"
                className="col-span-3"
              />
            </div>

            <div className="flex gap-[73px]">
              <Label className="mb-[10px]">Зураг</Label>
              {!preview ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    ref={fileInputRef}
                    className="w-full border rounded p-2 bg-[#7F7F800D] text-transparent h-[150px] z-10"
                  />
                  <div className="absolute right-[120px] top-[340px] flex flex-col items-center gap-2">
                    <img src="/Images/AddImage.png" className="w-8 h-8" />
                    <div className="text-sm font-medium">
                      Choose or drag image
                    </div>
                  </div>
                </>
              ) : (
                <div className=" flex justify-center items-center w-full h-[180px] border border-dashed border-gray-300 rounded relative overflow-hidden">
                  <img
                    src={preview}
                    className="w-full h-full object-cover rounded"
                    alt="Preview"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <div
                  onClick={() => {
                    onDelete(foodData._id);
                    onUpdate();
                  }}
                  className="w-[48px] h-[40px] rounded-lg bg-white border border-red-500 flex justify-center items-center"
                >
                  <TrashIcon />
                </div>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? <HashLoader size={16} /> : "Өөрчлөлтийг хадгалах"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
