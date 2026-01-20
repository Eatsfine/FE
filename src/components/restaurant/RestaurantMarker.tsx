import type { Restaurant } from "@/types/restaurant";
import { MapPin } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
};

export default function RestaurantMarker({ restaurant, onSelect }: Props) {
  const pos = restaurant.markerPosition;

  if (!pos) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect(restaurant)}
      className="absolute -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110 flex flex-col items-center"
      style={{
        left: `${pos.leftPct}%`,
        top: `${pos.topPct}%`,
      }}
      aria-label={`${restaurant.name} 선택`}
    >
      <MapPin className="size-10 text-red-600 fill-red-300" strokeWidth={2} />
      <div className="mt-1 whitespace-nowrap rounded bg-white px-2 py-1 text-xs shadow">
        {restaurant.name}
      </div>
    </button>
  );
}
