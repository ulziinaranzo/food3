"use client";
import { useRef, useState, useEffect } from "react";
import { EditFoodFormProps } from "./Types";
import { DropdownCategory } from "./DropDownCategory";
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

export const EditFoodForm = ({
  categoryName,
  categories,
  setSelectedCategory,
  selectedCategory,
  foodData,
}: EditFoodFormProps) => {
  const [name, setName] = useState<string>(foodData?.foodName || "");
  const [category, setCategory] = useState<string>(
    foodData?.categoryName || ""
  );
  const [ingredients, setIngredients] = useState<string>(
    foodData?.ingredients || ""
  );
  const [price, setPrice] = useState<string>(foodData?.price || "");
  const [img, setImg] = useState<FileList | null>(foodData?.img[0] || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (foodData) {
      setName(foodData.foodName || "");
      setCategory(foodData.categoryName || "");
      setIngredients(foodData.ingredients || "");
      setPrice(foodData.price || "");
    }
  }, [foodData]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category && ingredients && price && img?.length) {
      const formData = new FormData();
      formData.append("foodName", name);
      formData.append("price", price);
      formData.append("ingredients", ingredients);
      formData.append("categoryName", categoryName ?? "");
      formData.append("img", img[0]);

      try {
        await axios.post("http://localhost:3001/food", formData, {});
        alert("Амжилттай өөрчиллөө, cutie");
        setName("");
        setCategory("");
        setIngredients("");
        setPrice("");
        setImg(null);
      } catch (error: any) {
        console.error(error);
        alert("Хоолны мэдээлэл өөрчлөхөд алдаа гарлаа");
      }
    } else {
      alert("Бүх хэсгийг бөглөнө үү");
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    if (categoryId) {
      setCategory(categoryId);
    }
  };

  const handleRemoveImage = () => {
    setImg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imgHave = !img || img.length === 0 || img === null;

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
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="h-fit w-[472px] rounded-lg bg-white p-[24px] gap-[24px] flex flex-col"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Хоолны нэр
              </Label>
              <Input
                id="foodName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Хоолны категори
              </Label>
              <DropdownCategory
                className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px]"
                setSelectedCategory={setCategory}
                selectedCategory={category}
                categories={categories}
                handleCategorySelect={handleCategorySelect}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-left">
                Хоолны орц, найрлага
              </Label>
              <Input
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-left">
                Хоолны үнэ
              </Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex gap-[16px]">
              <div className="font-400 text-[12px] text-[#71717A] w-[120px]">
                Хоолны зураг
              </div>
              {imgHave && (
                <input
                  type="file"
                  className="relative w-[288px] h-[116px] rounded-md"
                  ref={fileInputRef}
                  onChange={(e) => setImg(e.target.files)}
                />
              )}
            </div>
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
                    className="w-full h-[116px] object-cover rounded-[10px]"
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
