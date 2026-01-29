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
  } = useForm({
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
      reservationDeadline: "",
      minPeople: 1,
      maxPeople: 1,
      acceptSameDay: false,
      noShowPolicy: false,
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
        <h3 className="text-gray-900 mb-2 font-bold">가게 정보 입력</h3>
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

        <h3 className="text-gray-900 mb-4 font-bold">예약 정책</h3>
        <div>
          <Label className="block text-gray-700 mb-2">
            예약 가능 기간 <span className="text-red-500">*</span>
          </Label>
          <select
            {...register("reservationDeadline")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">선택해주세요</option>
            <option value="1주일 전까지">1주일 전까지</option>
            <option value="2주일 전까지">2주일 전까지</option>
            <option value="1개월 전까지">1개월 전까지</option>
            <option value="3개월 전까지">3개월 전까지</option>
          </select>
          {errors.reservationDeadline && touchedFields.reservationDeadline && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reservationDeadline.message}
            </p>
          )}
        </div>
        <div>
          <Label className="block text-gray-700 mb-2">
            최소 예약 인원 <span className="text-red-500">*</span>
          </Label>
          <input
            type="number"
            {...register("minPeople")}
            onFocus={(e) => e.target.select()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.minPeople && touchedFields.minPeople && (
            <p className="text-red-500 text-xs mt-1">
              {errors.minPeople.message}
            </p>
          )}
        </div>
        <div>
          <Label className="block text-gray-700 mb-2">
            최대 예약 인원 <span className="text-red-500">*</span>
          </Label>
          <input
            type="number"
            {...register("maxPeople")}
            onFocus={(e) => e.target.select()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.maxPeople && touchedFields.maxPeople && (
            <p className="text-red-500 text-xs mt-1">
              {errors.maxPeople.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">당일 예약 허용</p>
            <p className="text-gray-600 mt-1 text-sm">
              당일 예약을 받을 수 있습니다
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("acceptSameDay")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">노쇼 방지 정책</p>
            <p className="text-gray-600 mt-1 text-sm">
              예약 시 결제 정보를 받습니다
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("noShowPolicy")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </form>
    </div>
  );
}
