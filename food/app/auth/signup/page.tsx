"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Step } from "./_components/step";
import { Step1 } from "./_components/step1";
import { useAuth } from "@/app/_providers/AuthProvider";
import { FormData, EmailStepData, PasswordStepData } from "./_components/Types";
import { toast } from "sonner";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { signUp } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleNextEmail = (data: EmailStepData) => {
    setFormData((prev) => ({ ...prev, email: data.email }));
    setStep(1);
  };

  const handleSubmitPassword = async (data: PasswordStepData) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    try {
      await signUp({
        email: newFormData.email,
        password: newFormData.password,
        name: "Таны нэр",
      });
      setStep(2);
    } catch (error) {
      let errorMessage = "Алдаа гарлаа";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data?.message === "string"
      ) {
        errorMessage = (error as any).response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(`Бүртгэхэд алдаа гарлаа: ${errorMessage}`);
      console.error("❌ Бүртгэхэд алдаа гарлаа", error);
    }
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
          handleNext={handleNextEmail}
          defaultData={{ email: formData.email }}
        />
      )}
      {step === 1 && (
        <Step1
          handlePrev={handlePrev}
          handleSubmitPassword={handleSubmitPassword}
          defaultData={{
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }}
        />
      )}
      {step === 2 && <div>🎉 Бүртгэл амжилттай!</div>}
    </motion.div>
  );
}
