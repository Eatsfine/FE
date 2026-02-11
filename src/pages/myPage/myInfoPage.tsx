import { phoneNumber } from "@/utils/phoneNumber";
import { Camera, Save } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Form = {
  email: string;
  nickname: string;
  phone: string;
};

export default function MyInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [draftImageFile, setDraftImageFile] = useState<File | null>(null);
  // const objectUrlRef = useRef<string | null>(null);

  const shownFile = isEditing ? draftImageFile : originalImageFile;
  const [shownUrl, setShownUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!shownFile) {
      setShownUrl(null);
      return;
    }
    const url = URL.createObjectURL(shownFile);
    setShownUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [shownFile]);

  const [original, setOriginal] = useState<Form>({
    email: "user@example.com",
    nickname: "맛있는유저",
    phone: "010-1234-5678",
  });
  const [draft, setDraft] = useState<Form>(original);

  const handleEditStart = () => {
    setDraft(original);
    setDraftImageFile(originalImageFile);
    setIsEditing(true);
  };

  const handleChange = (key: keyof Form, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDraftImageFile(file);
    e.target.value = "";
  };

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  };

  const handleSave = () => {
    // TODO: API 호출
    if (!isValidPhone(draft.phone)) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }
    // TODO: API 성공후
    setOriginal(draft);
    setOriginalImageFile(draftImageFile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(original);
    setDraftImageFile(originalImageFile);
    setIsEditing(false);
  };
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      {/* title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium">내 정보</h2>

        {!isEditing ? (
          <button
            onClick={handleEditStart}
            className="cursor-pointer transition rounded-lg px-3 py-2 text-lg font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            수정하기
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="cursor-pointer transition border rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 tracking-wide"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer transition flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 tracking-wide"
            >
              <Save size={16} />
              <p className="px-1 ml-1">저장</p>
            </button>
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col items-center gap-10">
        {/* avatar */}
        <div className="relative">
          <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {shownUrl ? (
              <img
                src={shownUrl}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-500">맛</span>
            )}
          </div>

          {isEditing && (
            <>
              <button
                onClick={handleImageClick}
                className="cursor-pointer transition absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-700"
              >
                <Camera size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* form */}
        <div className="w-full space-y-5">
          {/* 아이디 */}
          <div>
            <label className="mb-1 block text-gray-600">아이디</label>
            <input
              disabled
              value="user1234"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
            <p className="mt-1 text-sm text-gray-400">
              아이디는 변경할 수 없습니다
            </p>
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-1 block text-gray-600">이메일</label>
            <input
              disabled={!isEditing}
              value={draft.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label className="mb-1 block text-gray-600">닉네임</label>
            <input
              disabled={!isEditing}
              value={draft.nickname}
              onChange={(e) => handleChange("nickname", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="mb-1 block text-gray-600">전화번호</label>
            <input
              disabled={!isEditing}
              value={draft.phone}
              onChange={(e) =>
                handleChange("phone", phoneNumber(e.target.value))
              }
              inputMode="numeric"
              autoComplete="tel"
              className={`w-full rounded-lg border px-4 py-3 ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
