"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Step } from "./_components/step";
import { Step1 } from "./_components/step1";
import { useAuth } from "@/app/_providers/AuthProvider";
import { toast } from "sonner";
import { FormData } from "./_components/Types";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { signIn } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleNext = async () => {
    if (step === 1) {
      try {
        await signIn(formData.email, formData.password);
      } catch (error) {
        console.error("Нэвтрэхэд алдаа гарлаа", error);
        return;
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.5 },
  };

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
