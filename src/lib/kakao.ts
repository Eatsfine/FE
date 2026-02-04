declare global {
  interface Window {
    kakao: any;
  }
}

let loadingPromise: Promise<void> | null = null;

export function loadKakaoMapSdk(): Promise<void> {
  // 이미 로드됨
  if (window.kakao?.maps) return Promise.resolve();

  if (loadingPromise) return loadingPromise;

  const key = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;
  if (!key) {
    return Promise.reject(
      new Error("VITE_KAKAO_JS_KEY가 .env에 없습니다. (.env 확인)"),
    );
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;

    script.onload = () => {
      if (!window.kakao?.maps?.load) {
        reject(new Error("Kakao Maps SDK 로드에 실패했습니다."));
        return;
      }
      window.kakao.maps.load(() => resolve());
    };

    script.onerror = () =>
      reject(new Error("Kakao Maps SDK 스크립트 로드 실패"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}
