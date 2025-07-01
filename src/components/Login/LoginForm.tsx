/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import LoginFormInput from "../inputComponent/LoginFormInput";
import { getCurrentUser, loginUser } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export type loginFormValues = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const { setIsLoading, setUser } = useUser();
  const [redirect, setRedirect] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginFormValues>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setRedirect(searchParams.get("redirectPath"));
  }, []);

  const onSubmit = async (data: loginFormValues) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        if (redirect) {
          router.push(redirect);
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsLoading(false);
          reset();
        } else {
          router.push("/");
          reset();
        }
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 md:mt-32">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login to your profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LoginFormInput
            label="Email"
            name="email"
            placeholder="enter your valid email"
            register={register}
            error={errors.email}
            type="text"
            required={true}
          />
          <LoginFormInput
            label="Password"
            name="password"
            placeholder="enter your password"
            register={register}
            error={errors.password}
            type="password"
            required={true}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer"
          >
            {isSubmitting ? "Loading" : "Login"}
          </button>
        </form>
        <div className="flex gap-2 items-center mt-2">
          <h1>New to our site? Please</h1>
          <Link href="/signUp" className="text-blue-700 cursor-pointer">
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
