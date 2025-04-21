"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type StepProps = {
  handlePrev: () => void
  handleNext: () => void
}

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z
    .string()
    .min(1, { message: "Нууц үгээ давтан оруулна уу" })
    .refine((value, context) => value !== context?.parent?.password, {
      message: "Нууц үг таарахгүй байна",
    }),
})

type FormData = z.infer<typeof formSchema>

export const Step1 = ({ handlePrev, handleNext }: StepProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: FormData) => {
    console.log(values)
    handleNext()
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex">
        <div className="flex flex-col pt-[326px] pl-[100px] pb-[410px] pr-[48px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <img
                src="/Images/Icon-Button.png"
                className="w-[36px] h-[36px] cursor-pointer"
                alt="Back"
                onClick={handlePrev}
              />
              <div className="text-black text-[24px] font-[600]">
                Create your account
              </div>
              <div className="text-[16px] text-[#71717A] font-[400] mt-[4px]">
                Sign up to explore your favorite dishes.
              </div>

              <FormField
                control={form.control}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showPassword"
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
                />
                <Label htmlFor="showPassword">Show password</Label>
              </div>

              <Button type="submit" className="w-[416px] h-[36px]">
                Let's Go
              </Button>

              <div className="flex gap-[12px] items-center justify-center pt-4">
                <div className="text-[16px] text-[#71717A]">
                  Already have an account?
                </div>
                <Link href="/login" className="text-[16px] text-[#2563EB]">
                  Log In
                </Link>
              </div>
            </form>
          </Form>
        </div>

        <div className="p-[20px]">
          <img
            src="/Images/form-pic.png"
            alt="Form Illustration"
            className="w-[856px] h-[904px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
