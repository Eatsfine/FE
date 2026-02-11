import z from "zod";

export const StoreCategoryEnum = z.enum([
  "KOREAN",
  "CHINESE",
  "JAPANESE",
  "WESTERN",
  "CAFE",
]);

export const DepositRateEnum = z.enum([
  "TEN",
  "TWENTY",
  "THIRTY",
  "FORTY",
  "FIFTY",
]);

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const StoreInfoSchema = z
  .object({
    storeName: z.string().min(1, { message: "가게 이름을 입력하세요." }),

    description: z.string().min(1, { message: "가게 소개를 입력하세요." }),

    address: z.string().min(1),
    detailAddress: z.string().optional(),

    // 숨겨진 값들
    sido: z.string(),
    sigungu: z.string(),
    bname: z.string(),
    latitude: z.number(),
    longitude: z.number(),

    phoneNumber: z
      .string()
      .min(1, { message: "전화번호를 입력하세요." })
      .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
        message: "올바른 전화번호 형식이 아닙니다.",
      }),

    category: StoreCategoryEnum,

    depositRate: DepositRateEnum,

    bookingIntervalMinutes: z.preprocess((val) => {
      if (val === "" || val === undefined || Number.isNaN(val)) {
        return 0;
      }
      return Number(val);
    }, z.number().min(0)),

    openTime: z.string().min(1),
    closeTime: z.string().min(1),
    holidays: z.array(z.string()).optional(),

    mainImage: z
      .any()
      .refine((file) => !!file, {
        message: "식당 대표 이미지를 등록해주세요.",
      })
      .refine(
        (file) => {
          if (file instanceof File) {
            return file.size <= MAX_FILE_SIZE;
          }
          return true;
        },
        {
          message: "이미지 크기는 1MB 이하여야 합니다.",
        },
      )
      .refine(
        (file) => {
          if (file instanceof File) {
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
          }
          return true;
        },
        {
          message: ".jpg, .png 형식의 이미지만 업로드 가능합니다.",
        },
      ),
  })
  .refine(
    (data) => {
      if (data.openTime && data.closeTime) {
        return data.openTime < data.closeTime;
      }
      return true;
    },
    {
      message: "영업 시작 시간은 마감 시간보다 빨라야 합니다.",
      path: ["closeTime"],
    },
  );

export type StoreInfoFormValues = z.infer<typeof StoreInfoSchema>;
