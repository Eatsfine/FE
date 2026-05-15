import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-full uppercase tracking-widest transition-all",
  {
    variants: {
      variant: {
        glass:
          "border border-white-1/20 bg-white-1/5 backdrop-blur-sm hover:bg-gold-1 hover:border-gold-1 text-white-1 hover:text-black-1",
        solid:
          "bg-black-1 text-gold-1 hover:scale-105 after:absolute after:inset-0 after:-z-10 after:bg-white-1 after:opacity-0 after:transition-opacity hover:after:opacity-10",
      },
      size: {
        sm: "px-8 py-3 text-sm font-medium",
        lg: "px-12 py-6 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "sm",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);

BaseButton.displayName = "BaseButton";
