import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/cn";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentType = "kakao" | "toss";

export default function PaymentAddModal({ isOpen, onClose }: Props) {
  const [selectedType, setSelectedType] = useState<PaymentType>("kakao");

  const handleAddSubmit = () =>{
    alert("결제수단이 성공적으로 추가되었습니다.");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">결제수단 추가</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* 결제 방법 선택 */}
          <div className="space-y-3">
            <p className="text-md font-medium text-gray-700">결제 방법 선택</p>
            <div className="grid grid-cols-3 gap-3">
              <PaymentTypeButton
                active={selectedType === "kakao"}
                onClick={() => setSelectedType("kakao")}
                label="카카오페이"
                icon={<span className="text-2xl">💛</span>}
              />
              <PaymentTypeButton
                active={selectedType === "toss"}
                onClick={() => setSelectedType("toss")}
                label="토스페이"
                icon={<span className="text-2xl">💙</span>}
              />
            </div>
          </div>

          {/* 하단 옵션 및 버튼 */}
          <div className="space-y-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">기본 결제수단으로 설정</span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 py-4 text-md font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button className="flex-1 rounded-xl bg-blue-500 py-4 text-md font-bold text-white hover:bg-blue-600 transition-colors"
              onClick={handleAddSubmit}>
                추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentTypeButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border-2 py-4 transition-all",
        active ? "border-blue-500 bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"
      )}
    >
      {icon}
      <span className={cn("text-sm font-medium", active ? "text-blue-600" : "text-gray-600")}>{label}</span>
    </button>
  );
}