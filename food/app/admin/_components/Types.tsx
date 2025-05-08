"use client";
export type Food = {
  _id: string;
  foodName: string;
  image: string[];
  price: number;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  quantity: number;
  foodId: string;
};

export type Category = {
  _id: string;
  categoryName: string;
  foods?: Food[];
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
  price: number;
  ingredients: string;
  imgUrl: string;
  category: string;
};

export type formData = {
  username: string;
  password: string;
  confirmPassword: string;
};
export type User = {
  _id: string;
  email: string;
  role: "admin" | "user";
  phoneNumber?: string;
  address?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
};
