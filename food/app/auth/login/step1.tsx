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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
};

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const Step1 = ({ handlePrev, handleNext }: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    handleNext();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex flex-col pt-[326px] pl-[100px] pb-[410px] pr-[48px]">
          <Form {...form}>
            <div className="flex flex-col">
              <img
                src="/Images/Icon-Button.png"
                className="w-[36px] h-[36px] cursor-pointer mb-[20px]"
                onClick={handlePrev}
              />
              <div className="text-black text-[24px] font-[600] mt-[24px]">
Нэвтрэх              </div>
              <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">
                Нэвтрээд хүссэн хоолоо захиалаарай.
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Нууц үгээ оруулна уу"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
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
                <div className="text-[16px] text-[#2563EB]">Кодоо мартсан уу?</div></div>
                <Link href={"/"}>
                <Button type="submit" className="w-[416px] h-[36px] mt-[24px]">
                  Let's Go
                </Button>
                </Link> 
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
