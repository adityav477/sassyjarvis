"use client"
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { RegistrationSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/myComponents/(form)/form-error";
import { useState } from "react";
import registrationAction from "@/actions/RegistrationAction";
import SocialsButtons from "./socials";

export default function RegistrationForm() {
  const [error, setError] = useState<{ message: string, success: null | number }>({
    message: "",
    success: null,
  })

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  })

  async function onSubmit(data: z.infer<typeof RegistrationSchema>) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log(data);
    const response = await registrationAction(data);
    setError(response);
  }

  return <div>
    <Card >
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription> Good to have you </CardDescription>
      </CardHeader>
      <CardContent>
        <form >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="font-semibold">Name</label>
              <input type="text" id="name" placeholder="Enter Your Name"
                {...register("name")} className="border-slate-300 border-2 rounded-lg px-2 py-1" />
              {errors.name && <div className="text-xs text-red-500">
                {errors.name.message}
              </div>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="Email" className="font-semibold">Email</label>
              <input type="email" id="Email" placeholder="Enter Your Registered Email"
                {...register("email")} className="border-slate-300 border-2 rounded-lg px-2 py-1" />
              {errors.email && <div className="text-xs text-red-500">
                {errors.email.message}
              </div>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="Password" className="font-semibold">Password</label>
              <input type="password" id="Password" placeholder="Enter Your Password"
                {...register("password")} className="border-slate-300 border-2 rounded-lg px-2 py-1" />
              {errors.password && <div className="text-xs text-red-500">
                {errors.password.message}
              </div>}
            </div>

            <Button onClick={handleSubmit(onSubmit)}
              variant="outline" className=" text-white bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 ">
              {isSubmitting ? "...Loading" : "SignUp"}
            </Button>
            <FormError message={error.message} success={error.success} />

          </div>
        </form>
        <SocialsButtons />
      </CardContent>
      <CardFooter>
        <Button variant="link" >
          <Link href="/signin">
            Already have an account? LogIn
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </div >
}
