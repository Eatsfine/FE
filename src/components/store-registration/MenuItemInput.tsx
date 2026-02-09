import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import type { MenuFormValues } from "./Menu.schema";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { Trash2, Upload, X } from "lucide-react";
import { Label } from "@radix-ui/react-label";

interface MenuItemInputProps {
  index: number;
  onDelete: () => void;
  register: UseFormRegister<MenuFormValues>;
  control: Control<MenuFormValues>;
  errors: FieldErrors<MenuFormValues>;
  setValue: UseFormSetValue<MenuFormValues>;
}

export default function MenuItemInput({
  index,
  onDelete,
  register,
  control,
  errors,
  setValue,
}: MenuItemInputProps) {
  //임시 이미지 주소 저장소
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // previewUrl이 바뀔 때나 컴포넌트가 사라질 때 Cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  //파일을 브라우저용 임시 주소로 변환
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //메모리 누수 방지를 위해 사용하지 않는 이미지 URL을 해제
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      //URL.createObjectURL: 파일 객체를 임시 URL 문자열로 만들어주는 브라우저 기능
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setValue(`menus.${index}.imageKey`, file);
    }
  };

  const handleRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue(`menus.${index}.imageKey`, null);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">메뉴 {index + 1}</span>
        <button
          type="button"
          onClick={onDelete}
          aria-label="메뉴 삭제"
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div>
        <Label className="block text-gray-700 mb-2">메뉴 이미지</Label>
        <div className="flex items-start gap-4">
          <Label
            className={`relative w-32 h-32 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden group
            ${
              previewUrl
                ? "border-gray-200 border-solid"
                : "border-gray-300 border-dashed hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="메뉴 이미지 미리보기"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-gray-500 hover:bg-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </>
            ) : (
              <>
                <Upload className="size-8 text-gray-400" aria-hidden="true" />
                <span className="text-xs text-gray-500 mt-2">
                  이미지 업로드
                </span>
              </>
            )}
          </Label>

          <div className="flex-1 text-xs text-gray-500">
            <p>• 권장 크기: 800 x 800px</p>
            <p>• 최대 용량: 5MB</p>
            <p>• 형식: JPG, PNG</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="block text-gray-700 mb-2">
            메뉴명
            <span className="text-red-500">*</span>
          </Label>
          <input
            {...register(`menus.${index}.name`)}
            type="text"
            placeholder="예: 스테이크"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.menus?.[index]?.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.menus[index]?.name?.message}
            </p>
          )}
        </div>
        <div>
          <Label className="block text-gray-700 mb-2">
            가격
            <span className="text-red-500">*</span>
          </Label>
          <input
            {...register(`menus.${index}.price`)}
            type="text"
            placeholder="30000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.menus?.[index]?.price && (
            <p className="text-red-500 text-xs mt-1">
              {errors.menus[index]?.price?.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label className="block text-gray-700 mb-2">
          카테고리 <span className="text-red-500">*</span>
        </Label>
        <Controller
          name={`menus.${index}.category`}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="MAIN">메인 메뉴</option>
              <option value="SIDE">사이드 메뉴</option>
              <option value="BEVERAGE">음료</option>
              <option value="ALCOHOL">주류</option>
            </select>
          )}
        />
      </div>
      <div>
        <Label className="block text-gray-700 mb-2">메뉴 설명</Label>
        <textarea
          {...register(`menus.${index}.description`)}
          placeholder="메뉴에 대한 간단한 설명"
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    </div>
  );
}
