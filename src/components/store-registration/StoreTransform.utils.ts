import type { BusinessHour, Day, RequestStoreCreateDto } from "@/types/store";
import type { StoreInfoFormValues } from "./StoreInfo.schema";

// 시도 명칭 풀네임 변환
export const formatSido = (sido: string): string => {
  const mapping: Record<string, string> = {
    서울: "서울특별시",
    부산: "부산광역시",
    대구: "대구광역시",
    인천: "인천광역시",
    광주: "광주광역시",
    대전: "대전광역시",
    울산: "울산광역시",
    세종: "세종특별자치시",
    경기: "경기도",
    강원: "강원특별자치도",
    충북: "충청북도",
    충남: "충청남도",
    전북: "전북특별자치도",
    전남: "전라남도",
    경북: "경상북도",
    경남: "경상남도",
    제주: "제주특별자치도",
  };
  return mapping[sido] || sido;
};

// 시간 문자열 객체 변환
export const formatTimeToBackend = (timeStr: string | undefined): string => {
  if (!timeStr) {
    throw new Error("영업 시간은 필수입니다.");
  }
  return timeStr;
};

export const transformToRegister = (
  step1Data: { businessNumber: string; startDate: string },
  step2Data: Partial<StoreInfoFormValues>,
): RequestStoreCreateDto => {
  const {
    address,
    detailAddress,
    sido,
    openTime,
    closeTime,
    holidays = [],
    latitude,
    longitude,
  } = step2Data;

  const fullAddress =
    detailAddress && address ? `${address} ${detailAddress}` : address || "";

  const weekDays: Day[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const businessHours: BusinessHour[] = weekDays.map((day) => {
    const isClosed = holidays.includes(day);
    return {
      day,
      openTime: isClosed ? null : formatTimeToBackend(openTime),
      closeTime: isClosed ? null : formatTimeToBackend(closeTime),
      isClosed,
    };
  });

  // 최종 조립
  return {
    storeName: step2Data.storeName || "",
    businessNumberDto: {
      businessNumber: step1Data.businessNumber,
      startDate: step1Data.startDate,
    },
    description: step2Data.description || "",
    sido: formatSido(sido || ""),
    sigungu: step2Data.sigungu || "",
    bname: step2Data.bname || "",
    address: fullAddress || "",
    latitude: Number(latitude) || 0,
    longitude: Number(longitude) || 0,
    phoneNumber: step2Data.phoneNumber || "",
    category: step2Data.category as any,
    depositRate: step2Data.depositRate as any,
    bookingIntervalMinutes: step2Data.bookingIntervalMinutes || 0,
    businessHours,
  };
};
