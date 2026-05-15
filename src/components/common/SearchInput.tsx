import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  iconClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, wrapperClassName, iconClassName, ...props }, ref) => {
    return (
      <div className={cn("group relative w-full", wrapperClassName)}>
        <input
          ref={ref}
          type="search"
          aria-label="검색"
          className={cn(
            "w-full bg-white-1/5 border-b-2 border-white-1/20 text-white-1 px-4 py-4 pl-12 focus:outline-none focus:border-gold-1 focus:bg-white-1/10 transition-all duration-300 font-light placeholder:text-white-1/40",
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
            className,
          )}
          {...props}
        />
        <svg
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white-1/50 transition-colors duration-300 group-focus-within:text-gold-1",
            iconClassName,
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
