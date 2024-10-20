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
import Link from "next/link"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "./(form)/form-error";
import loginAction from "@/actions/loginAction";
import { useState } from "react";
import SocialsButtons from "./socials";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoaderButton from "./LoaderButton";

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState<{ message: string, success: null | number }>({
    message: "",
    success: null
  })

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema)
  });

  //to get the error form the url for signing up with same email but differnet providerr
  const searchParams = useSearchParams();
  const errorURL = searchParams.get("error") === "OAuthAccountNotLinked" ? toast.error("Email registered through different provider") : "";


  //credentials Login
  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
    const response = await loginAction(data);
    setError({
      message: response?.message,
      success: response?.success
    })
    router.push("/dashboard");
  }

  return <div>
    <Card >
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome Back</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={() => {
          console.log("form got submitted");
        }}>
          <div className="grid w-full items-center gap-4">
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
              {isSubmitting ? <LoaderButton /> : "LogIn"}
            </Button>
            <FormError message={error.message || errorURL} success={error.success} />

          </div>
        </form>
        <SocialsButtons />
      </CardContent>
      <CardFooter>
        <Link href="/signup">
          <Button variant="link" >
            {"Don't have an Account? SignUp"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </div >
}
