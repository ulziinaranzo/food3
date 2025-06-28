"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormData, EmailFormData } from "./Types";

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Хамгийн багадаа 2 тэмдэгт байх ёстой.",
    })
    .email({ message: "Имэйлээ зөв оруулна уу" }),
});

export const Step = ({
  handleNext,
  handlePrev,
  formData,
  onFormDataChange,
}: StepProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formData.email || "",
    },
  });

  function onSubmit(values: EmailFormData) {
    onFormDataChange({ email: values.email });
    handleNext();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex flex-col pt-[326px] pl-[100px] pb-[410px] pr-[48px] mb-[24px]">
          <div className="flex flex-col">
            <Link href={"/"}>
              <img
                src="/Images/Icon-Button.png"
                className="w-[36px] h-[36px] mb-[20px]"
              />
            </Link>

            <div className="text-black text-[24px] font-[600]">Нэвтрэх</div>
            <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">
              Нэвтрээд хүссэн хоолоо захиалаарай
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      placeholder="Имэйлээ оруулна уу"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <div className="flex gap-[12px] mt-[24px] justify-start">
                <div className="text-[16px] text-[#2563EB]">
                  Кодоо мартсан уу?
                </div>
              </div>
              <Button type="submit" className="w-[416px] h-[36px]">
                Let's Go
              </Button>
            </form>
          </div>
        </div>
        <div className="p-[20px]">
          <img
            src="/Images/restaurant.jpg"
            alt="Form Illustration"
            className="w-[856px] h-[904px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
