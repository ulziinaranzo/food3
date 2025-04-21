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
    const response = await axios.get("http://localhost:3001/foods");
    setFoods(response.data);
    console.log(response);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="flex flex-col w-max-[1440px] w-[1440px] h-fit mx-auto">
      <Header />
      <BackgroundPic />
      <HomePage />
      <Footer />
    </div>
  );
}
