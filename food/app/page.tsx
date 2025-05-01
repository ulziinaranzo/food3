"use client";
import { useEffect, useState } from "react";
import { BackgroundPic } from "./components/BackGroundImg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import axios from "axios";

export default function Home() {
  return (
    <div className="flex flex-col w-max-[1440px] w-[1440px] h-fit mx-auto">
      <Header />
      <div className="w-[1440px] h-[570px]">
        <img src="/Images/homepage-cover.png" />
      </div>
      <HomePage />
      <Footer />
    </div>
  );
}
