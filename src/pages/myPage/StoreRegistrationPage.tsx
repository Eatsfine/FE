import RegistrationNavigation from "@/components/store-registration/RegistrationNavigation";
import RegistrationStepper from "@/components/store-registration/RegistrationStepper";
import StepBusinessAuth from "@/components/store-registration/StepBusinessAuth";
import StepStoreInfo from "@/components/store-registration/StepStoreInfo";
import type { StoreInfoFormValues } from "@/components/store-registration/StoreInfo.schema";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

type Step1Data = {
  businessNumber: string;
  isVerified: boolean;
};

export default function StoreRegistrationPage() {
  //현재 진행 중인 단계 상태 관리
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  //결과 관리
  const [step1Data, setStep1Data] = useState<Step1Data>({
    businessNumber: "",
    isVerified: false,
  });

  const [step2Data, setStep2Data] = useState<Partial<StoreInfoFormValues>>({});

  //각 단계별 유효성(완료) 상태 관리
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);

  const TOTAL_STEPS = 3;

  const handleStep2Change = useCallback(
    (isValid: boolean, data: StoreInfoFormValues) => {
      setStep2Data(data);
      setIsStep2Valid(isValid);
    },
    [],
  );

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      console.log("최종 등록 요청 API 호출");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  //현재 단계에 맞는 유효성 검사를 통과하지 못하면 버튼 비활성화
  const isNextDisabled =
    (currentStep === 1 && !isStep1Valid) ||
    (currentStep === 2 && !isStep2Valid) ||
    (currentStep === 3 && !isStep3Valid);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-gray-900">새 가게 등록</h2>
              <p className="mt-1 text-sm text-gray-500 break-keep">
                잇츠파인에 가게를 <br className="block sm:hidden" />
                등록하고 예약을 받아보세요
              </p>
            </div>
            <Link
              to="/mypage/store"
              className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="size-6" />
            </Link>
          </div>
        </div>
      </header>

      <RegistrationStepper currentStep={currentStep} />
      <main className="max-w-7xl mx-auto px-6 py-5 sm:px-8 sm:py-8">
        {currentStep === 1 && (
          <StepBusinessAuth
            defaultValues={step1Data}
            onComplete={(data) => {
              setStep1Data(data);
              setIsStep1Valid(data.isVerified);
            }}
          />
        )}
        {currentStep === 2 && (
          <StepStoreInfo
            defaultValues={step2Data}
            onChange={handleStep2Change}
          />
        )}
        {currentStep === 3 && <div>메뉴 등록 폼</div>}
      </main>

      <RegistrationNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrev={handlePrev}
        onNext={handleNext}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}
