"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FormData = {
  password: string;
};
type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
};

const formSchema = z.object({
  password: z.string().min(6, {
    message: "6-с дээш тэмдэгт байх хэрэгтэй",
  }),
});

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
    },
  });

  const onSubmit = (data: FormData) => {
    onFormDataChange(data);
    console.log(formData.password);
    handleNext();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex flex-col pt-[326px] pl-[100px] pb-[410px] pr-[48px]">
          <div className="flex flex-col">
            <img
              src="/Images/Icon-Button.png"
              className="w-[36px] h-[36px] cursor-pointer mb-[20px]"
              onClick={handlePrev}
            />
            <div className="text-black text-[24px] font-[600] mt-[24px]">
              Нэвтрэх{" "}
            </div>
            <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">
              Нэвтрээд хүссэн хоолоо захиалаарай.
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="flex items-center space-x-2 mt-[8px]">
                <Checkbox
                  id="showPassword"
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(!!checked)}
                />
                <Label htmlFor="showPassword">Show password</Label>
              </div>
              <div className="flex gap-[12px] mt-[24px] justify-start ">
                <div className="text-[16px] text-[#2563EB]">
                  Кодоо мартсан уу?
                </div>
              </div>

              <Button type="submit" className="w-[416px] h-[36px] mt-[24px]">
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
