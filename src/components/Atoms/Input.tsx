import classNames from "classnames";
import React, { HTMLInputTypeAttribute } from "react";

import { B2, B5, B6 } from "@/common/typography";

export type InputProps = {
  type: HTMLInputTypeAttribute;
  classNameInput?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  pattern?: string;
  label?: string;
  name: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  classNameInput,
  placeholder,
  className,
  disabled,
  pattern,
  label,
  name,
  type,
  error,
  value,
  onChange,
  onBlur,
}: InputProps) => {
  const globalClass = classNames("flex", "flex-col");

  const inputClassWrapper = classNames(
    "relative",
    "flex",
    "rounded-md",
    "text-black",
    "border",
    "border-[#D3CCCC]",
    "bg-white",
    "shadow",
    {
      "border-red-100 border-2": !!error,
      "bg-opacity-70": disabled,
    }
  );

  const inputClass = classNames(
    "w-full",
    "rounded-md",
    "my-2",
    "mx-2",
    "text-base",
    "font-normal",
    "focus:outline-none",
    {
      "bg-transparent": disabled,
      "text-gray-400": disabled,
    }
  );

  return (
    <div className={`${globalClass} ${className}`}>
      <label>
        {label && (
          <B2 className="mb-1" color="text-slate-200" fontWeight="font-bold">
            {label}
          </B2>
        )}
      </label>
      <div className={inputClassWrapper}>
        <input
          className={`${inputClass} ${classNameInput}`}
          pattern={pattern}
          placeholder={placeholder}
          type={type}
          name={name}
          disabled={disabled}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {!!error && <B6 color="text-red-400" margin="mt-1">{`${error}`}</B6>}
    </div>
  );
};

export default Input;
