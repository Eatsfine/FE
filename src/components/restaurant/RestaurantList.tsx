import RestaurantCard from "./ReataurantCard";
import type { Restaurant } from "@/types/restaurant";

type Props = {
  restaurants: Restaurant[];
  onSelect: (restaurant: Restaurant) => void;
};

export default function RestaurantList({ restaurants, onSelect }: Props) {
  if (restaurants.length === 0) {
    return (
      <div className="rounded p-6 text-center text-md text-muted-foreground">
        검색 결과가 없어요.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      {restaurants.map((r, idx) => (
        <div key={r.id}>
          <RestaurantCard restaurant={r} onClick={() => onSelect(r)} />
          {idx !== restaurants.length - 1 ? (
            <div className="h-px bg-gray-100" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
