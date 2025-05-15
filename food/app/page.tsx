"use client";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";

export default function Home() {
  return (
    <div className="flex flex-col w-[1440px] mx-auto h-fit bg-[#18181B] ;">
      <Header />
      <div className="w-full h-[570px] ">
        <img src="/Images/Landing_image_Desktop.jpg " />
      </div>
      <HomePage />
      <Footer />
    </div>
  );
}
