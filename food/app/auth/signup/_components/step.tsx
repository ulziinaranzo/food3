"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { EmailStepData, FormData } from "./Types";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Хамгийн багадаа 2 тэмдэгт байх ёстой." })
    .email({ message: "Имэйлээ зөв оруулна уу." }),
});

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
  } = useForm<EmailStepData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formData.email,
    },
  });

  const onSubmit = (data: EmailStepData) => {
    onFormDataChange({ email: data.email });
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Имэйлээ оруулна уу" type="email" />
        )}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Button type="submit">Let's Go</Button>
    </form>
  );
};
