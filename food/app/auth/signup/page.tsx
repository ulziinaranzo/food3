"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Step } from "./_components/step";
import { Step1 } from "./_components/step1";
import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { signUp } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePrev = async () => setStep((prev) => prev - 1);
  const handleNext = async () => {
    if (step === 1) {
      console.log("🧪 formData:", formData);
      try {
        await signUp(formData.email, formData.password);
        console.log("✅ Бүртгэл амжилттай");
      } catch (error) {
        console.error("Бүртгэхэд алдаа гарлаа", error);
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.5 },
  };

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };
  console.log("USERRr", formData);
  return (
    <motion.div
      key={step}
      className="flex justify-center items-center h-screen w-screen bg-[#F4F4F4]"
      variants={handleAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {step === 0 && (
        <Step
          handlePrev={handlePrev}
          handleNext={handleNext}
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
      )}
      {step === 1 && (
        <Step1
          handlePrev={handlePrev}
          handleNext={handleNext}
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
      )}
    </motion.div>
  );
}
