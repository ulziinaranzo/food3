"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Хамгийн багадаа 2 тэмдэгт байх ёстой." })
    .email({ message: "Имэйлээ зөв оруулна уу." }),
});

type FormData = {
  email: string;
};

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
};

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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formData.email || "",
    },
  });

  const onSubmit = (data: FormData) => {
    onFormDataChange({ email: data.email });
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
            <Button type="submit" className="w-full">
              Let's Go
            </Button>
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
