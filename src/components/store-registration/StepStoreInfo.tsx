import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { StoreInfoSchema, type StoreInfoFormValues } from "./StoreInfo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { phoneNumber } from "@/utils/phoneNumber";

interface StepStoreInfoProps {
  defaultValues: Partial<StoreInfoFormValues>; // 부모로부터 받을 초기값
  onChange: (isValid: boolean, data: StoreInfoFormValues) => void; // 부모에게 데이터 전달할 함수
}

export default function StepStoreInfo({
  defaultValues,
  onChange,
}: StepStoreInfoProps) {
  const {
    register,
    control,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<StoreInfoFormValues>({
    resolver: zodResolver(StoreInfoSchema),
    mode: "onChange",
    defaultValues: {
      storeName: "",
      category: "",
      address: "",
      phone: "",
      openTime: "",
      closeTime: "",
      holidays: [],
      ...defaultValues,
    },
  });

  //값이 변할 때마다 부모에게 실시간 보고
  const values = watch();

  useEffect(() => {
    onChange(isValid, values as StoreInfoFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, JSON.stringify(values), onChange]);

  const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h3 className="text-gray-900 mb-2">가게 정보 입력</h3>
        <p className="text-gray-600 text-sm">
          고객에게 보여질 가게 정보를 입력해주세요.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="storeName" className="block text-gray-700 mb-2">
              가게 이름
              <span className="text-red-500">*</span>
            </Label>
            <input
              id="storeName"
              {...register("storeName")}
              type="text"
              placeholder="예: 더 플레이스 강남점"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.storeName && touchedFields.storeName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="category" className="block text-gray-700 mb-2">
              음식 종류
              <span className="text-red-500">*</span>
            </Label>
            <select
              id="category"
              {...register("category")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">선택해주세요</option>
              <option value="한식">한식</option>
              <option value="일식">일식</option>
              <option value="중식">중식</option>
              <option value="양식">양식</option>
              <option value="이탈리안">이탈리안</option>
              <option value="카페">카페</option>
              <option value="기타">기타</option>
            </select>
            {errors.category && touchedFields.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="block text-gray-700 mb-2">
            주소
            <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                id="address"
                {...register("address")}
                type="text"
                placeholder="주소 검색"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap cursor-pointer"
              >
                주소 검색
              </button>
            </div>
            {errors.address && touchedFields.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
            <input
              id="detailAddress"
              aria-label="상세주소"
              {...register("detailAddress")}
              type="text"
              placeholder="상세주소 (선택)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="block text-gray-700 mb-2">
            전화번호
            <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                id="phone"
                type="tel"
                placeholder="02-1234-5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value || ""}
                onChange={(e) => {
                  const formatted = phoneNumber(e.target.value);
                  onChange(formatted);
                }}
                maxLength={13}
              />
            )}
          />
          {errors.phone && touchedFields.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="openTime" className="block text-gray-700 mb-2">
              영업 시작 시간
              <span className="text-red-500">*</span>
            </Label>
            <input
              id="openTime"
              {...register("openTime")}
              type="time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.openTime && touchedFields.openTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.openTime.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="closeTime" className="block text-gray-700 mb-2">
              영업 종료 시간 <span className="text-red-500">*</span>
            </Label>
            <input
              id="closeTime"
              {...register("closeTime")}
              type="time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.closeTime && touchedFields.closeTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.closeTime.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="" className="block text-gray-700 mb-2">
            정기 휴무일(선택)
          </Label>
          <Controller
            name="holidays"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => {
                  const isSelected = value.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const newHolidays = isSelected
                          ? value.filter((d: string) => d !== day)
                          : [...value, day];
                        onChange(newHolidays);
                      }}
                      className={`px-4 py-2 border rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
        <div>
          <Label htmlFor="description" className="block text-gray-700 mb-2">
            가게 소개 (선택)
          </Label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="가게에 대한 간단한 소개를 작성해주세요."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </form>
    </div>
  );
}
