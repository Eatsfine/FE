import type { Restaurant } from "@/types/restaurant";
import { Star } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  onClick: () => void;
};

export default function RestaurantCard({ restaurant, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {restaurant.name}
          </p>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {restaurant.category ?? "카테고리 없음"} • {restaurant.address}
          </p>
        </div>

        <span className="flex items-center gap-2 text-sm text-gray-500 shrink-0 self-center">
          {" "}
          <Star className="size-5 text-yellow-500 fill-yellow-500" />
          {restaurant.rating.toFixed(1)}
        </span>
      </div>
    </button>
  );
}
