export type KakaoAddressSearchResult = {
  x: string;
  y: string;
};

declare global {
  interface Window {
    kakao?: {
      maps?: {
        services?: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: { x: string; y: string }[],
                status: string,
              ) => void,
            ) => void;
          };
          Status: {
            OK: string;
          };
        };
      };
    };
  }
}

export {};
