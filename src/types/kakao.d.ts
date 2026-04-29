declare global {
  interface Window {
    kakao?: {
      maps?: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: KakaoAddressSearchResult[],
                status: KakaoAddressSearchStatus,
              ) => void,
            ) => void;
          };
          Status: {
            OK: "OK";
            ZERO_RESULT: "ZERO_RESULT";
            ERROR: "ERROR";
          };
        };
        Map: new (
          container: HTMLDivElement,
          options: { center: unknown; level: number },
        ) => {
          relayout: () => void;
          panTo: (latlng: unknown) => void;
          setLevel: (level: number) => void;
          setBounds: (bounds: unknown) => void;
        };
        Marker: new (option: {
          map: unknown;
          position: unknown;
          clickable: boolean;
          zIndex: number;
        }) => {
          setMap: (map: unknown) => void;
          setZIndex: (zIndex: number) => void;
        };
        InfoWindow: new (options: { zIndex: number }) => {
          setContent: (content: Node | string) => void;
          open: (map: unknown, marker: unknown) => void;
        };
        LatLngBounds: new () => {
          extend: (latlng: unknown) => void;
        };
        event: {
          addListener: (target: unknown, type: string, handler: () => void) => void;
        };
      };
    };
  }
}

export {};

export type KakaoAddressSearchStatus = "OK" | "ZERO_RESULT" | "ERROR";

export type KakaoAddressSearchResult = {
  x: string;
  y: string;
};
