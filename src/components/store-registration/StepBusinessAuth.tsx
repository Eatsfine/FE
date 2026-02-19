import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  BusinessAuthSchema,
  type BusinessAuthFormValues,
} from "./BusinessAuth.schema";
import { useVerifyOwner } from "@/hooks/queries/useAuth";
import { getErrorMessage } from "@/utils/error";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";

interface StepBusinessAuthProps {
  defaultValues: {
    name: string;
    businessNumber: string;
    startDate: string;
    isVerified: boolean;
  };
  onComplete: (data: {
    name: string;
    businessNumber: string;
    startDate: string;
    isVerified: boolean;
  }) => void;
}

export default function StepBusinessAuth({
  defaultValues,
  onComplete,
}: StepBusinessAuthProps) {
  const { mutate: verifyOwner, isPending } = useVerifyOwner();

  const [isVerified, setIsVerified] = useState(defaultValues.isVerified);
  const isMountedRef = useRef(true);

  const nav = useNavigate();

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, touchedFields },
  } = useForm<BusinessAuthFormValues>({
    resolver: zodResolver(BusinessAuthSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultValues.name,
      businessNumber: defaultValues.businessNumber,
      startDate: defaultValues.startDate,
    },
  });

  const name = watch("name");
  const businessNumber = watch("businessNumber");
  const startDate = watch("startDate");

  const onSubmit = async (data: BusinessAuthFormValues) => {
    verifyOwner(data, {
      onSuccess: async () => {
        if (!isMountedRef.current) return;
        await logout();
        nav("/", { replace: true });
      },
      onError: (error) => {
        const err = error as any;
        const serverCode = err.response?.data?.code || err.code;
        if (serverCode === "OWNER409") {
          const isConfirmed = confirm(
            "이미 인증된 계정입니다.\n\n" +
              "지금 입력하신 사업자 정보로 가게 등록을 진행하시겠습니까?\n" +
              "(정보가 정확하지 않으면 최종 등록이 되지 않을 수 있습니다.)",
          );
          if (isConfirmed) {
            setIsVerified(true);
            onComplete({
              name: data.name,
              businessNumber: data.businessNumber,
              startDate: data.startDate,
              isVerified: true,
            });
          } else {
            setIsVerified(false);
          }
          return;
        }
        setIsVerified(false);
        alert(getErrorMessage(error));
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-6 sm:space-y-8"
    >
      <div>
        <h3 className="text-gray-900 mb-2">사업자등록번호 인증</h3>
        <p className="text-gray-600 text-sm">
          사업자등록번호를 입력하고 인증을 진행해주세요.
        </p>
      </div>
      <div className="space-y-3">
        <div>
          <Label htmlFor="name" className="block text-gray-700 mb-2">
            대표자명 <span className="text-red-500">*</span>
          </Label>
          <input
            id="name"
            {...register("name", {
              onChange: (e) => {
                if (isVerified) {
                  setIsVerified(false);
                  onComplete({
                    name: e.target.value,
                    businessNumber,
                    startDate,
                    isVerified: false,
                  });
                }
              },
            })}
            type="text"
            placeholder="대표자명을 입력해주세요."
            maxLength={20}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && touchedFields.name && (
            <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="businessNumber" className="block text-gray-700 mb-2">
            사업자등록번호 <span className="text-red-500">*</span>
          </Label>
          <input
            id="businessNumber"
            inputMode="numeric"
            {...register("businessNumber", {
              onChange: (e) => {
                if (isVerified) {
                  setIsVerified(false);
                  onComplete({
                    name,
                    businessNumber: e.target.value,
                    startDate,
                    isVerified: false,
                  });
                }
              },
            })}
            type="text"
            placeholder="10자리 숫자를 입력해주세요."
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.businessNumber && touchedFields.businessNumber && (
            <p className="text-red-500 text-xs mt-2">
              {errors.businessNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="startDate" className="block text-gray-700 mb-2">
            개업일자 <span className="text-red-500">*</span>
          </Label>
          <input
            id="startDate"
            {...register("startDate", {
              onChange: (e) => {
                if (isVerified) {
                  setIsVerified(false);
                  onComplete({
                    name,
                    businessNumber,
                    startDate: e.target.value,
                    isVerified: false,
                  });
                }
              },
            })}
            type="text"
            inputMode="numeric"
            placeholder="8자리 숫자를 입력해주세요."
            maxLength={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.startDate && touchedFields.startDate && (
            <p className="text-red-500 text-xs mt-2">
              {errors.startDate.message}
            </p>
          )}
        </div>
      </div>

      {!isPending && isVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="size-5" aria-hidden="true" />
            <span>사업자등록번호가 인증되었습니다.</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !isValid || isVerified}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            확인 중...
          </span>
        ) : isVerified ? (
          "인증 완료"
        ) : (
          "인증하기"
        )}
      </button>
    </form>
  );
}
