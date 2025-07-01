"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextAreaTypeProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  rows?: number;
}

const InputTextArea: React.FC<TextAreaTypeProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  required = false,
  rows = 4,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <textarea
          rows={rows}
          {...register(name, {
            ...(required && { required: `${name} is required` }),
          })}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
            border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:dark:border-blue-400 resize-none`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputTextArea;
