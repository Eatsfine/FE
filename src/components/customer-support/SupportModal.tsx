import { Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { supportSchema, type SupportFormValues } from "./support.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const inputStyle =
  "text-base bg-white w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";

const defaultValues: SupportFormValues = {
  name: "",
  email: "",
  category: "예약",
  subject: "",
  message: "",
};

export default function SupportModal({
  isOpen,
  onClose,
  onComplete,
}: SupportModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues,
    mode: "onSubmit",
  });

  // 폼 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: SupportFormValues) => {
    try {
      console.log("Support data:", data);
      //await API
      onComplete();
    } catch (e) {
      console.error("error:", e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[90%] sm:w-full sm:max-w-2xl max-h-[90vh] p-0 flex flex-col overflow-hidden gap-0"
      >
        <DialogHeader className="shrink-0 bg-white px-6 py-4 border-b mt-0">
          <div className="flex items-center justify-between">
            <DialogTitle>1:1 문의하기</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* 스크린 리더용 설명(경고 방지) */}
          <DialogDescription className="sr-only">
            1:1 문의 내용을 작성하는 폼
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 이름 */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium">
                  이름 <span className="text-red-500">*</span>
                </Label>
                <input
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  className={inputStyle}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* 이메일 */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-medium">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className={inputStyle}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* 문의 유형 */}
            <div className="space-y-3">
              <Label htmlFor="category" className="text-base font-medium">
                문의 유형 <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                className={inputStyle + " cursor-pointer"}
                {...register("category")}
              >
                <option value="예약">예약 문의</option>
                <option value="결제/환불">결제/환불 문의</option>
                <option value="식당 등록">식당 등록 문의</option>
                <option value="리뷰">리뷰 관련</option>
                <option value="기술 지원">기술 지원</option>
                <option value="기타">기타</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1 font-medium">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* 제목 */}
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-base font-medium">
                제목 <span className="text-red-500">*</span>
              </Label>
              <input
                id="subject"
                type="text"
                placeholder="문의 제목을 입력하세요"
                className={inputStyle}
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* 문의 내용 */}
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-medium">
                문의 내용 <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="message"
                rows={6}
                placeholder="문의하실 내용을 자세히 입력하세요"
                className={inputStyle + " resize-none"}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                📧 문의하신 내용은 영업일 기준 24시간 이내에 이메일로
                답변드립니다.
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="size-4" />
                {isSubmitting ? "문의 중..." : "문의하기"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
