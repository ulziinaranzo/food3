"use client"

import { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export const Step = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full h-screen flex">
      <div className="flex">
        <div className="flex pt-[326px] pl-[100px] pb-[410px] pr-[48px]">
          <Form {...form}>
            <div className="flex flex-col">
              <div className="text-black text-[24px] font-[600]">Create your account</div>
              <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">
                Sign up to explore your favorite dishes.
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showPassword"
                    checked={showPassword}
                    onCheckedChange={(checked) => setShowPassword(!!checked)}
                  />
                  <Label htmlFor="showPassword">Show password</Label>
                </div>

                <Button type="submit" className="w-[416px] h-[36px]">Let's Go</Button>
              </form>
            </div>
          </Form>
        </div>
        <div className="p-[20px]">
          <img
            src="Images/form-pic.png"
            alt="Form Illustration"
            className="w-[856px] h-[904px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
