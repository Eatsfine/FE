import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import PaymentAddModal from "@/components/modals/paymentAddModal";

interface PaymentMethod {
  id: string;
  type: "간편결제";
  name: string;
  detail: string;
  isDefault: boolean;
  iconUrl?: string; // 간편결제 로고 URL
}

export default function PaymentPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "간편결제",
      name: "카카오페이",
      detail: "",
      isDefault: false,
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("결제 수단을 삭제하시겠습니까?")) {
      setMethods(methods.filter((m) => m.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setMethods(
      methods.map((m) => ({
        ...m,
        isDefault: m.id === id,
      })),
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      {/* 헤더 영역 */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-medium">결제수단 관리</h2>
          <p className="mt-0.5 text-sm text-gray-600">
            예약 시 사용할 결제수단을 관리하세요
          </p>
        </div>
        <button
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          결제수단 추가
        </button>
      </div>

      {/* 결제 수단 리스트 */}
      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className={cn(
              "group relative flex items-center justify-between rounded-lg border-2 p-3 transition",
              method.isDefault
                ? "border-blue-500 bg-blue-50"
                : "border-gray-100",
            )}
          >
            <div className="flex items-center gap-4">
              {/* 아이콘 영역 */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-xl">💛</span>
              </div>

              {/* 정보 영역 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{method.name}</span>
                  <span className="text-sm text-gray-700">{method.detail}</span>
                  {method.isDefault && (
                    <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      기본
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{method.type}</p>
              </div>
            </div>

            {/* 액션 버튼 영역 */}
            <div className="flex items-center gap-3">
              {!method.isDefault && (
                <button
                  onClick={() => handleSetDefault(method.id)}
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  기본으로 설정
                </button>
              )}
              <button
                onClick={() => handleDelete(method.id)}
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
              >
                <Trash2 size={20} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <PaymentAddModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {methods.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400">등록된 결제 수단이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
