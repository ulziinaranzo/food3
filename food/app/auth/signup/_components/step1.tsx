"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z
  .object({
    password: z.string().min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Нууц үгээ давтан оруулна уу." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });

type FormData = {
  password: string;
  confirmPassword: string;
};

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
};

export const Step1 = ({
  handlePrev,
  handleNext,
  formData,
  onFormDataChange,
}: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: formData.password,
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    onFormDataChange(data);
    handleNext();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex-1 p-8 space-y-6 mt-[200px]">
          <div className="flex flex-col justify-between items-start mb-[24px]">
            <img
              src="/Images/Icon-Button.png"
              className="w-9 h-9 cursor-pointer mb-[24px]"
              alt="Back"
              onClick={handlePrev}
            />
            <div className="text-xl font-semibold text-gray-900">
              Шинэ бүртгэл үүсгэх
            </div>
          </div>
          <p className="text-md text-gray-600">
            Бүртгүүлээд хоолоо захиалаарай.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үг"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="mt-4">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үг дахин"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
              />
              <Label htmlFor="showPassword">Нууц үгийг харуулах</Label>
            </div>
            <Link href={"/"}>
              <Button type="submit" className="w-full mt-4">
                Let's Go
              </Button>
            </Link>
          </form>

          <div className="flex justify-center items-center space-x-2 pt-4">
            <span className="text-gray-500">Бүртгэлтэй юу?</span>
            <Link href="/auth/login" className="text-blue-600">
              Нэвтрэх
            </Link>
          </div>
        </div>

        <div className="p-[20px]">
          <img
            src="/Images/foody.png"
            alt="Form Illustration"
            className="w-[856px] h-[904px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
