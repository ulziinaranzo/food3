"use client";
export type Food = {
  _id: string;
  foodName: string;
  image: string[];
  price: number;
  ingredients: string;
};

export type Category = {
  _id: string;
  categoryName: string;
  foods?: Food[];
};
export type AddFoodFormProps = {
  category: string;
  onClose: () => void;
  categoryName: string;
};

export type EditFoodFormProps = {
  category: string;
  onClose: () => void;
  categoryName: string 
  categories: { _id: string; categoryName: string }[];
}

export type AllCategory = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

export type CategoryWithFoods = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

export type AddCategoryProps = {
  onClose: () => void;
  addCategory: () => void;
};