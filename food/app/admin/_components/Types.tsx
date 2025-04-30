"use client";
export type Food = {
  _id: string;
  foodName: string;
  image: string[];
  price: number;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
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
  getFoods: () => void;
  categoryId: string;
};

export type EditFoodFormProps = {
  category: string;
  onClose: () => void;
  categoryName: string;
  categories: { _id: string; categoryName: string }[];
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
  foodData: () => {};
};

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
export type FormData = {
  name: string;
  category: string;
  ingredients: string;
  img: FileList;
  price: string;
};
export type FoodOrderItem = {
  food: Food;
  quantity: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Order = {
  _id: string;
  user: User;
  foodOrderItems: FoodOrderItem[];
  address: string;
  totalPrice: number;
  status: "pending" | "delivered" | "cancelled";
  createdAt: string;
};

export type FormValues = {
  foodName: string;
  price: string;
  ingredients: string;
  imgUrl: string;
};
