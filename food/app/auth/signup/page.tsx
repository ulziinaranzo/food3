"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/_providers/AuthProvider";
import { FormData, EmailStepData, PasswordStepData } from "./_components/Types";
import { toast } from "sonner";
import { Step } from "./_components/step";
import { Step1 } from "./_components/step1";

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
      const result = await signUp({
        email: newFormData.email,
        password: newFormData.password,
        name: "Таны нэр",
      });
      if (result) {
        toast.success("Амжилттай бүртгүүллээ!");
        setStep(2);
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const responseError = error as any;
        if (responseError?.response?.status === 409) {
          toast.error("Имэйл бүртгэлтэй байна");
        } else {
          toast.error("Бүртгэл амжилтгүй боллоо");
        }
      } else {
        toast.error("Алдаа гарлаа");
      }

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
      {step === 2}
    </motion.div>
  );
}
