/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputTypePassword from "@/components/inputComponent/InputPassword";
import InputType from "@/components/inputComponent/InputType";
import { FormValues } from "@/types/signUp.types";
import { useForm } from "react-hook-form";
import ImagePreviewer from "../inputComponent/imagePreviewer";
import ImageUploader from "../inputComponent/imageUploader";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { imageUpload } from "@/utills/imageUploader";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const SIgnUp = () => {
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!imageFile) {
      toast.error("you need to upload your image", { duration: 3000 });
      return;
    }
    const userInfo: FormValues = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const photoURL = await imageUpload(imageFile);
      if (!photoURL) {
        toast.error("image uploading faild", { duration: 3000 });
        return;
      }
      userInfo.photoURL = photoURL;
      const res = await registerUser(userInfo);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        router.push("/");
        reset();
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 mt-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <InputType
            label="Name"
            name="name"
            register={register}
            error={errors.name}
            required={true}
          />
          <InputType
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            type="email"
            required={true}
          />
          {imagePreview ? (
            <ImagePreviewer
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <div>
              <ImageUploader
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
            </div>
          )}
          <InputTypePassword
            register={register}
            error={errors.password}
            name="password"
            label="Password"
            required={true}
          />
          <InputTypePassword
            register={register}
            error={errors.confirmPass}
            name="confirmPass"
            label="Confirm Password"
            required={true}
            validateMatch={watch("password")}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer mt-4"
          >
            {isSubmitting ? "Loading" : "Sign up"}
          </button>
        </form>
        <div className="flex gap-2 items-center mt-2">
          <h1>Already have an Account? Please</h1>
          <Link href="/login" className="text-blue-700 cursor-pointer">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SIgnUp;
