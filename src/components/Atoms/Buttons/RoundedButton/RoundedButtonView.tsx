import { RoundedButtonProps } from "./useRoundedButton";

import React from "react";

import ClassNames from "classnames";

import { B1 } from "@/common/typography";
import { ButtonVariants } from "@/constants";

const RoundedButtonView = ({
  variant,
  disabled,
  className,
  onClick,
  loading,
  type,
  children,
}: React.PropsWithChildren<RoundedButtonProps>) => {
  const btnClass = ClassNames(
    "flex",
    "items-center",
    "bg-slate-100",
    "py-2",
    "px-6",
    "rounded-xl",
    "hover:brightness-105",
    "active:brightness-95",
    "justify-center",
    {
      "bg-white": variant === ButtonVariants.SECONDARY,
      "pointer-events-none opacity-50": disabled || loading,
      "border border-blue-800": variant === ButtonVariants.SECONDARY,
      "hover:bg-green-700": variant === ButtonVariants.SECONDARY,
    }
  );
  return (
    <button
      className={`${btnClass} ${className}`}
      data-testid="button"
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
    >
      <B1
        color={
          variant === ButtonVariants.SECONDARY ? "text-white" : "text-blue-800"
        }
        fontWeight="font-semibold"
      >
        {children}
      </B1>
    </button>
  );
};

export default RoundedButtonView;
