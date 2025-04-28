"use client";
import { useRef, useState, useEffect } from "react";
import { EditFoodFormProps } from "./Types";
import { DropdownCategory } from "./DropDownCategory";
import axios from "axios";

export const EditFoodForm = ({
  onClose,
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
        onClose();
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
    <form
      onSubmit={onSubmit}
      className="h-fit w-[472px] rounded-lg bg-white p-[24px] gap-[24px] flex flex-col"
    >
      <div className="flex justify-between pb-[40px]">
        <div className="text-[18px] font-semibold">Хоолны мэдээлэл</div>
        <button
          type="button"
          className="w-[36px] h-[36px] rounded-full bg-[#F4F4F5] text-[12px]"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="flex gap-[16px]">
        <div className="font-400 text-[12px] text-[#71717A] w-[120px]">
          Хоолны нэр
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Хоолны нэр"
          className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px] h-min-[36px]"
        />
      </div>
      <div className="flex gap-[16px]">
        <div className="font-400 text-[12px] text-[#71717A] w-[120px]">
          Категори
        </div>
        <DropdownCategory
          className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px]"
          setSelectedCategory={setCategory}
          selectedCategory={category}
          categories={categories}
          handleCategorySelect={handleCategorySelect}
        />
      </div>
      <div className="flex gap-[16px]">
        <div className="font-400 text-[12px] text-[#71717A] w-[120px]">
          Хоолны орц, найрлага
        </div>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Хоолны орц, найрлагаа оруулна уу"
          className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px] h-min-[80px]"
        />
      </div>
      <div className="flex gap-[16px]">
        <div className="font-400 text-[12px] text-[#71717A] w-[120px]">
          Хоолны үнэ
        </div>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Хоолны үнээ оруулна уу"
          className="w-[288px] rounded-sm pl-[12px] py-[8px] border-[1px] h-min-[80px]"
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
    </form>
  );
};
