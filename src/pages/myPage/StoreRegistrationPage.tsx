import CompleteModal from "@/components/store-registration/CompleteModal";
import ConfirmModal from "@/components/store-registration/ConfirmModal";
import type { MenuFormValues } from "@/components/store-registration/Menu.schema";
import RegistrationNavigation from "@/components/store-registration/RegistrationNavigation";
import RegistrationStepper from "@/components/store-registration/RegistrationStepper";
import StepBusinessAuth from "@/components/store-registration/StepBusinessAuth";
import StepMenuRegistration from "@/components/store-registration/StepMenuRegistration";
import StepStoreInfo from "@/components/store-registration/StepStoreInfo";
import type { StoreInfoFormValues } from "@/components/store-registration/StoreInfo.schema";
import { transformToRegister } from "@/components/store-registration/StoreTransform.utils";
import { useMainImage, useRegisterStore } from "@/hooks/queries/useStore";
import { getErrorMessage } from "@/utils/error";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

type Step1Data = {
  businessNumber: string;
  startDate: string;
  isVerified: boolean;
};

export default function StoreRegistrationPage() {
  const { mutate: registerStore } = useRegisterStore();
  const { mutate: uploadImage } = useMainImage();

  const navigate = useNavigate();

  //모달 상태 관리
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  //현재 진행 중인 단계 상태 관리
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  //결과 관리
  const [step1Data, setStep1Data] = useState<Step1Data>({
    businessNumber: "",
    startDate: "",
    isVerified: false,
  });

  const [step2Data, setStep2Data] = useState<Partial<StoreInfoFormValues>>({});

  const [step3Data, setStep3Data] = useState<MenuFormValues>({ menus: [] });

  //각 단계별 유효성(완료) 상태 관리
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(true);

  const TOTAL_STEPS = 3;

  const handleStep2Change = useCallback(
    (isValid: boolean, data: StoreInfoFormValues) => {
      setStep2Data(data);
      setIsStep2Valid(isValid);
    },
    [],
  );

  const handleStep3Change = useCallback(
    (isValid: boolean, data: MenuFormValues) => {
      setStep3Data(data);
      setIsStep3Valid(isValid);
    },
    [],
  );

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      const finalPayload = transformToRegister(step1Data, step2Data);
      console.log("최종 payload 확인:", finalPayload);
      registerStore(finalPayload, {
        onSuccess: (res) => {
          console.log("등록 성공 응답:", res);

          const createdStoreId = res.storeId;

          if (step2Data.mainImage && step2Data.mainImage instanceof File) {
            uploadImage(
              {
                storeId: createdStoreId,
                body: { mainImage: step2Data.mainImage },
              },
              {
                onSuccess: () => {
                  console.log("이미지 업로드 완료");
                  setIsCompleteModalOpen(true);
                },
                onError: (err) => {
                  console.error("이미지 업로드 실패:", err);
                  alert(getErrorMessage(err));
                },
              },
            );
          } else {
            setIsCompleteModalOpen(true);
          }
        },
        onError: (error) => {
          console.error(" 등록 실패 원인:", error);
          alert(getErrorMessage(error));
        },
      });
    }
  };

  const handleExit = () => {
    setIsCompleteModalOpen(false);
    navigate("/mypage/store", { replace: true });
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
      <ConfirmModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={handleExit}
      />
      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={handleExit}
        autoCloseMs={5000}
        data={step2Data}
      />
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
            <button
              type="button"
              onClick={() => setIsExitModalOpen(true)}
              className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>
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
        {currentStep === 3 && (
          <StepMenuRegistration
            defaultValues={step3Data}
            onChange={handleStep3Change}
          />
        )}
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
