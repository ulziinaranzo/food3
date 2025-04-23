"use client";
import { useEffect, useState } from "react";
import { BackgroundPic } from "./components/BackGroundImg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import axios from "axios";

export default function Home() {
  const [foods, setFoods] = useState(null);

  const getFoods = async () => {
    try {
      const ids = ["67ff774370b8f9b24e8bc887", "67ff777770b8f9b24e8bc889"];
      const response = await axios.get(
        `http://localhost:3001/food?categoryId=${ids.join(",")}`
      );
      setFoods(response.data.foods);
      console.log(response);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      console.log("API response:", response.data);
      const categories = response.data.categories;
      setCategories(categories);
      console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col w-max-[1440px] w-[1440px] h-fit mx-auto">
      <Header />
      <BackgroundPic />
      <HomePage categories={categories} foods={foods} />
      <Footer />
    </div>
  );
}
