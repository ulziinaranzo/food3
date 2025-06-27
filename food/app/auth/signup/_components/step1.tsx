"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PasswordStepData, FormData } from "./Types";
import { useState } from "react";

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

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
};

export const Step1 = ({
  handleNext,
  handlePrev,
  formData,
  onFormDataChange,
}: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordStepData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  const onSubmit = (data: PasswordStepData) => {
    onFormDataChange(data);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder="Нууц үг"
          />
        )}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder="Нууц үг дахин"
          />
        )}
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="showPassword"
          checked={showPassword}
          onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
        />
        <Label htmlFor="showPassword">Нууц үгийг харуулах</Label>
      </div>

      <Button type="submit" className="w-full mt-4">
        Let's Go
      </Button>
    </form>
  );
};
