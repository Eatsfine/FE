import type { Restaurant } from "@/types/restaurant";
import { Clock, Star, Users, X } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  onClose: () => void;
};

function formatHours(r: Restaurant) {
  const { open, close, breakTime } = r.operatingHours;
  if (!breakTime) {
    return `${open} - ${close}`;
  }
  return `${open} - ${close} (브레이크타임 ${breakTime.start} - ${breakTime.end})`;
}

export default function RestaurantDetailModal({ restaurant, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="모달 닫기"
        onClick={onClose}
      />
      <div className="relative z-10 w-[92vw] max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden max-h-[calc(100vh-96px)] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div className="min-w-0">
            <h2 className="text-xl truncate">{restaurant.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X />
          </button>
        </div>
        <div className="overflow-y-auto">
          {restaurant.thumbnailUrl ? (
            <div className="w-full">
              <img
                src={restaurant.thumbnailUrl}
                alt={`${restaurant.name} 대표 이미지`}
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="size-5 text-yellow-500 fill-yellow-500" />
              <span>{restaurant.rating.toFixed(1)}</span>
              <span className="text-gray-500">
                ({restaurant.reviewCount}개 리뷰)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-gray-600" />
                <div>
                  <p className="text-gray-600">운영시간</p>
                  <p>{formatHours(restaurant)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="size-5 text-gray-600" />
                <div>
                  <p className="text-gray-600">총 좌석수</p>
                  <p>{restaurant.totalSeats}석</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">주소</p>
              <p>{restaurant.address}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">설명</p>
              <p className="text-gray-700">{restaurant.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-3">좌석 사진</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {restaurant.seatImages.map((img, idx) => (
                  <div
                    key={`${img.url}-${idx}`}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => {
                  // Todo: 예약페이지로 이동
                }}
              >
                식당 예약
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-100 text-black py-4 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => {
                  // Todo: 리뷰페이지로 이동
                }}
              >
                테이블 리뷰 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
