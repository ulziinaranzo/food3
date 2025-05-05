"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password." }),
});

type FormData = z.infer<typeof formSchema>;

export const Step1 = ({ handlePrev, handleNext }: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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
              Create your account
            </div>
          </div>
          <p className="text-md text-gray-600">
            Sign up to explore your favorite dishes.
          </p>

          <Form {...form}>
            <form>
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-[20px]">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.confirmPassword?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showPassword"
                  checked={showPassword}
                  onCheckedChange={(checked) =>
                    setShowPassword(Boolean(checked))
                  }
                  className="mt-[20px]"
                />
                <Label htmlFor="showPassword" className="mt-[20px]">
                  Show password
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-black text-white rounded-lg mt-[20px]"
              >
                Let's Go
              </Button>
            </form>
          </Form>

          <div className="flex justify-center items-center space-x-2 pt-4">
            <span className="text-gray-500">Already have an account?</span>
            <Link href={"/auth/login"} className="text-blue-600 text-sm">
              Log In
            </Link>
          </div>
        </div>

        <div className="w-1/2 p-8">
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
