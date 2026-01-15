import { Camera, Save } from "lucide-react";
import { useRef, useState } from "react";

export default function MyInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "user@example.com",
    nickname: "맛있는유저",
    phone: "010-1234-5678",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  setProfileImage(previewUrl);

  // TODO: 서버 업로드용 file은 따로 저장해도 됨
};

  const handleSave = () => {
    // TODO: API 호출
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: 원래 값으로 롤백하고 싶으면 여기서 처리
    setIsEditing(false);
  };

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm">
      {/* title */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-md text-gray-800">내 정보</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg px-3 py-2 text-md font-medium text-blue-600 hover:bg-blue-50"
          >
            수정하기
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="rounded-lg px-3 py-2 text-md text-gray-600 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save size={16} />
              <p className="px-2">
                저장
              </p>
            </button>
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col items-center gap-10">
        {/* avatar */}
        <div className="relative">
        <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {profileImage ? (
            <img
                src={profileImage}
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
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-700"
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
            <label className="mb-1 block text-md text-gray-600">
              아이디
            </label>
            <input
              disabled
              value="user1234"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-md text-gray-500"
            />
            <p className="mt-1 text-sm text-gray-400">
              아이디는 변경할 수 없습니다
            </p>
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-1 block text-md text-gray-600">
              이메일
            </label>
            <input
              disabled={!isEditing}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-md ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label className="mb-1 block text-md text-gray-600">
              닉네임
            </label>
            <input
              disabled={!isEditing}
              value={form.nickname}
              onChange={(e) => handleChange("nickname", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-md ${
                isEditing
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="mb-1 block text-md text-gray-600">
              전화번호
            </label>
            <input
              disabled={!isEditing}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-md ${
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
