"use client"
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
import { useContext } from "react"

const formSchema = z.object({
    username: z.string().min(2).max(50),
  })

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { saveData } = useContext(SaveContext);

  const handlePrev = async () => {
    setStep((prev) => prev - 1);
  }
  
  const handleContinue = (data) => {
    setStep(step + 1)
  }
  const handleAnimation = {
    initial: {opacity: 0}
  }
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
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
          <div className="flex text-black text-[24px] font-[600]">Create your account</div>
          <div className="text-[16px] text-[#71717A] font-[400] mb-[24px]">Sign up to explore your favorite dishes.</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[416px] h-[36px]">Let's Go</Button>
      </form>
      </div>
    </Form>
    
        </div>
    </div>
    <div className="p-[20px]">
    <img src="Images/form-pic.png" className="w-[856px] h-[904px] object-cover rounded-lg"/>
    </div>
    </div>
    )
}

    