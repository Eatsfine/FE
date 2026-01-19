import SupportFAQ from "@/components/customer-support/supportFaq";
import SupportHero from "@/components/customer-support/SupportHero";
import { CircleHelp } from "lucide-react";

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 py-6 flex items-center justify-center gap-3">
          <CircleHelp className="size-8 text-blue-600" aria-hidden="true" />
          <h1 className="text-gray-900 text-lg">잇츠파인 고객센터</h1>
        </div>
      </header>

      {/* 문의 섹션 */}
      <SupportHero />

      {/* FAQ 메인 */}
      <SupportFAQ />

      {/* 카드 섹션 */}

      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
          <p className="text-center break-keep">
            © 2026 Eatsfine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
