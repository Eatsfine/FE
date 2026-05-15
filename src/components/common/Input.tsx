import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, className, wrapperClassName, labelClassName, ...props }, ref) => {
    const inputId = props.id;
    return (
      <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-[11px] uppercase tracking-[0.2em] text-text-tertiary ml-1",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={props.type || "text"}
          id={inputId}
          className={cn(
            "w-full bg-black-2 border border-black-3 focus:border-gold-1 outline-none px-4 py-3.5 text-white-1 transition-colors placeholder:text-text-placeholder font-light",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
