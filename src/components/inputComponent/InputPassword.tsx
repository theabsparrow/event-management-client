/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: string;
  label: string;
  required?: boolean;
  validateMatch?: string;
}

const InputTypePassword: React.FC<PasswordInputProps> = ({
  register,
  error,
  name,
  label,
  required = false,
  validateMatch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative">
      <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        {...register(name, {
          ...(required && { required: `${label} is required` }),
          ...(name !== "confirmPass" && {
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
            maxLength: {
              value: 16,
              message: "Maximum 16 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
              message:
                "Must include uppercase, lowercase, number, and special character",
            },
          }),
          ...(name === "confirmPass" && {
            validate: (value) =>
              value === validateMatch || "Passwords do not match",
          }),
        })}
        className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:dark:border-blue-400`}
        placeholder="Enter your password"
      />
      <span
        className="absolute top-9 right-3 cursor-pointer text-gray-500 "
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <IoEye className="text-xl" />
        ) : (
          <IoEyeOff className="text-xl" />
        )}
      </span>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputTypePassword;
