import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function humanizeFail(code?: string | null, message?: string | null) {
  if (message && message.trim().length > 0) return message;

  switch (code) {
    case "PAYMENT_FAILED":
      return "결제에 실패했습니다.";
    case "PAYMENT_NOT_FOUND":
      return "결제 정보를 찾을 수 없습니다.";
    default:
      return "결제에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function FailPage() {
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const code = sp.get("code");
  const message = sp.get("message");
  const displayMessage = useMemo(
    () => humanizeFail(code, message),
    [code, message],
  );
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-2xl bg-white space-y-4">
        <h1 className="text-lg font-semibold">결제 실패</h1>
        <div className="rounded-xl bg-gray-50 p-4 space-y-2">
          <div className="text-sm text-gray-600">사유</div>
          <div className="text-base">{displayMessage}</div>
          {(code || message) && (
            <div className="text-xs text-gray-500 break-all">
              {code ? `code: ${code}` : null};{code && message ? "•" : null}
              {message ? `message: ${message}` : null};
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => nav(-1)}
          >
            다시시도
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => nav("/mypage/reservations", { replace: true })}
          >
            예약 목록으로
          </Button>
        </div>
      </div>
    </div>
  );
}
