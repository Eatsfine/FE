export type Restaurant = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  operatingHours: {
    open: string;
    close: string;
    breakTime?: {
      start: string;
      end: string;
    };
    //만약 요일별로 다르다고 한다면 확장될 가능성있음 weekday, weekend 등
  };
  totalSeats: number;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  description: string;
  seatImages: Array<{
    url: string;
    alt: string;
  }>;
  markerPosition: {
    leftPct: number;
    topPct: number;
  };
  thumbnailUrl?: string;
};
