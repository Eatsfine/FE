import { Lock, Bell, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  // 알림 설정을 위한 상태 관리
  const [notifications, setNotifications] = useState({
    reservation: true,
    promotion: true,
    review: false,
    email: true,
    sms: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg text-gray-900 mb-8">계정 설정</h2>

        {/* 비밀번호 변경 섹션 */}
        <div className="flex gap-4 pb-8 border-b border-gray-100">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Lock size={20} />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-md font-medium text-gray-900">
                비밀번호 변경
              </h3>
              <p className="text-md text-gray-500 mt-2">
                정기적인 비밀번호 변경으로 계정을 안전하게 보호하세요
              </p>
            </div>
            <button className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              비밀번호 변경하기
            </button>
          </div>
        </div>

        {/* 알림 설정 섹션 */}
        <div className="flex gap-4 py-8 border-b border-gray-100">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bell size={20} />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-900">알림 설정</h3>
              <p className="text-md text-gray-500 mt-2 pb-3">
                받고 싶은 알림을 선택하세요
              </p>
            </div>

            <div className="space-y-9">
              <ToggleButton
                label="예약 관련 알림"
                description="예약 확인, 변경, 취소 알림"
                enabled={notifications.reservation}
                onClick={() => toggleNotification("reservation")}
              />
              <ToggleButton
                label="프로모션 알림"
                description="할인, 이벤트 정보"
                enabled={notifications.promotion}
                onClick={() => toggleNotification("promotion")}
              />
              <ToggleButton
                label="리뷰 알림"
                description="내 리뷰에 대한 반응 알림"
                enabled={notifications.review}
                onClick={() => toggleNotification("review")}
              />
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="text-md font-medium text-gray-900">
                알림 수신 방법
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-md text-gray-700">이메일</span>
                <Switch
                  enabled={notifications.email}
                  onClick={() => toggleNotification("email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-md text-gray-700">SMS</span>
                <Switch
                  enabled={notifications.sms}
                  onClick={() => toggleNotification("sms")}
                />
              </div>
            </div>

            <button className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-md font-medium text-white hover:bg-blue-700 transition-colors">
              저장하기
            </button>
          </div>
        </div>

        {/* 계정 탈퇴 섹션 */}
        <div className="flex gap-4 pt-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Trash2 size={20} />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-md font-medium text-gray-900">계정 탈퇴</h3>
              <p className="text-md text-gray-500 mt-2">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다
              </p>
            </div>
            <button className="cursor-pointer rounded-lg border border-1 border-red-500 px-4 py-2 text-md font-medium text-red-600 hover:bg-red-50 transition-colors">
              계정 탈퇴하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// 토글 아이템 컴포넌트
function ToggleButton({
  label,
  description,
  enabled,
  onClick,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-md font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch enabled={enabled} onClick={onClick} />
    </div>
  );
}

// 스위치 UI 컴포넌트
function Switch({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        enabled ? "bg-blue-600" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          enabled ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
