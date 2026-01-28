import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-[440px]">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <DialogTitle>가게 등록을 그만두시겠습니까?</DialogTitle>
          <DialogDescription className="text-center mt-2">
            작성 중인 내용은 저장되지 않습니다.
            <br />
            정말 새 가게 등록을 그만두시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center w-full gap-6 mt-4">
          <button onClick={onConfirm} className="flex-1 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
            예
          </button>
          <button onClick={onClose} className="flex-1 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer">
            아니오
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
