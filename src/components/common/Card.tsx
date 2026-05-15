import React, { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RestaurantCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
  rating: string | number;
  category: string;
  location: string;
}

export const RestaurantCard = forwardRef<HTMLDivElement, RestaurantCardProps>(
  ({ image, name, rating, category, location, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("group cursor-pointer", className)} {...props}>
        <div className="relative overflow-hidden aspect-[4/3] mb-6">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black-1/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute top-4 right-4 bg-black-1/80 backdrop-blur-sm px-3 py-1 flex items-center gap-1">
            <svg className="w-3 h-3 text-gold-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white-1 text-xs font-light tracking-wider">{rating}</span>
          </div>
        </div>

        <div>
          <p className="text-gold-1 text-[11px] tracking-[0.2em] uppercase mb-2">{category}</p>
          <h3 className="text-2xl text-white font-serif mb-2 group-hover:text-gold-1 transition-colors">
            {name}
          </h3>
          <p className="text-text-tertiary text-sm font-light mb-6">{location}</p>

          <div className="w-full h-px bg-white-1/10 group-hover:bg-gold-1/50 transition-colors relative">
            <div className="absolute left-0 top-0 h-full w-0 bg-gold-1 group-hover:w-full transition-all duration-500" />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-text-muted uppercase tracking-widest">View Details</span>
            <svg
              className="w-4 h-4 text-text-muted group-hover:text-gold-1 transition-colors transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);

RestaurantCard.displayName = "RestaurantCard";
