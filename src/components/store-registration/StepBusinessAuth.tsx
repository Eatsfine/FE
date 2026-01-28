import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  businessNumber: z
    .string()
    .regex(/^[0-9]+$/)
    .length(10),
});

type FormValues = z.infer<typeof schema>;

interface StepBusinessAuthProps {
  defaultValues: {
    businessNumber: string;
    isVerified: boolean;
  };
  onComplete: (data: { businessNumber: string; isVerified: boolean }) => void;
}

export default function StepBusinessAuth({
  defaultValues,
  onComplete,
}: StepBusinessAuthProps) {
  //API 요청 중 로딩 관리
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      businessNumber: defaultValues.businessNumber,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      // (가상 API 호출) 1.5초 뒤에 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (!isMountedRef.current) return;
      onComplete({
        businessNumber: data.businessNumber,
        isVerified: true,
      });
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-6"
    >
      <div>
        <h3 className="text-gray-900 mb-2">사업자등록번호 인증</h3>
        <p className="text-gray-600 text-sm">
          사업자등록번호를 입력하고 인증을 진행해주세요.
        </p>
      </div>
      <div>
        <Label htmlFor="businessNumber" className="block text-gray-700 mb-2">
          사업자등록번호 <span className="text-red-500">*</span>
        </Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="businessNumber"
            inputMode="numeric"
            aria-describedby="businessNumber-error"
            {...register("businessNumber", {
              onChange: (e) => {
                if (defaultValues.isVerified) {
                  onComplete({
                    businessNumber: e.target.value,
                    isVerified: false,
                  });
                }
              },
            })}
            type="text"
            placeholder="0000000000"
            maxLength={10}
            aria-invalid={!!errors.businessNumber}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !isValid || defaultValues.isVerified}
            className="flex justify-center items-center w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">확인 중...</span>
            ) : defaultValues.isVerified ? (
              "인증 완료"
            ) : (
              "인증하기"
            )}
          </button>
        </div>
        <p
          id="businessNumber-error"
          className={`text-xs mt-2 ${errors.businessNumber && touchedFields.businessNumber ? "text-red-500" : "text-gray-500"}`}
        >
          10자리 숫자를 입력해주세요 (예: 1234567890)
        </p>
      </div>

      {!isLoading && defaultValues.isVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="size-5" aria-hidden="true" />
            <span>사업자등록번호가 인증되었습니다.</span>
          </div>
        </div>
      )}
    </form>
  );
}
