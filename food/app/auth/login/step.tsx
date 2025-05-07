"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
};

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email({ message: "Имэйлээ зөв оруулна уу" }),
});

export const Step = ({ handleNext }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleNext();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex flex-col pt-[326px] pl-[100px] pb-[410px] pr-[48px] mb-[24px]">
          <Form {...form}>
            <div className="flex flex-col">
              <Link href={"/"}>
                <img
                  src="/Images/Icon-Button.png"
                  className="w-[36px] h-[36px] mb-[20px]"
                />
              </Link>

              <div className="text-black text-[24px] font-[600]">
              Нэвтрэх
              </div>
              <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">
              Нэвтрээд хүссэн хоолоо захиалаарай
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Имэйл хаягаа оруулна уу"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-[12px] mt-[24px] justify-start ">
            <div className="text-[16px] text-[#2563EB]">Кодоо мартсан уу?</div>
          </div>
                <Button type="submit" className="w-[416px] h-[36px]">
                  Let's Go
                </Button>
              </form>
            </div>
          </Form>
          
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
