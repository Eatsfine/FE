import { CircleCheck } from "lucide-react";

export default function ForOwnerSection() {
  const items = [
    "매장과 테이블 레이아웃을 쉽게 등록",
    "실시간 예약 현황 관리",
    "고객 데이터 분석 및 인사이트",
    "노쇼 방지 및 예약 확정 시스템",
    "효율적인 테이블 회전율 관리",
  ];
  return (
    <section id="forowner" className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="relative">
            <p className="bg-linear-to-br from-[#E3F2FD] to-[#BBDEFB] rounded-3xl aspect-square flex items-center justify-center text-[#191919]/20">
              사장님 대시보드 이미지
            </p>
          </div>
          <div>
            <span className="inline-block bg-[#E3F2FD] px-4 py-2 rounded-full mb-6 text-sm tracking-wide font-normal">
              FOR OWNERS
            </span>
            <h2 className="text-5xl leading-[1.3] tracking-tight mb-6">
              사장님을 위한
              <br />
              스마트한 관리
            </h2>
            <p className="text-muted-foreground text-xl tracking-tight mb-10 leading-relaxed">
              예약 관리부터 매출 분석까지,
              <br />
              매장 운영의 모든 것을 한눈에.
            </p>
            <div className="space-y-4">
              {items.map((t) => (
                <div key={t} className="flex gap-4">
                  <CircleCheck className="w-6 h-6 text-[#191919]" />
                  <span className="text-lg">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
