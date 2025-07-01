/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface LoginFormProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  required?: boolean;
}
const LoginFormInput: React.FC<LoginFormProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  type,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <label
        className={`block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 `}
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        {type === "password" ? (
          <input
            type={showPassword ? "text" : "password"}
            {...register(name, {
              ...(required && {
                required: `${label} is required`,
              }),
            })}
            className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100  
        border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:dark:border-blue-400`}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <input
            {...(name === "email" && {
              ...register(name, {
                ...(required && {
                  required: `${label} is required`,
                  validate: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Enter a valid email",
                }),
              }),
            })}
            {...register(name, {
              ...(required && { required: `${label} is required` }),
            })}
            className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
          border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:dark:border-blue-400`}
            placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          />
        )}
        {type === "password" && (
          <span
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEye className="text-xl" />
            ) : (
              <IoEyeOff className="text-xl" />
            )}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default LoginFormInput;
