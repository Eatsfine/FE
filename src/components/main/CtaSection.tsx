import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useInView } from "@/hooks/useInView";

export default function CtaSection() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({
    threshold: 0.3,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });
  return (
    <section ref={sectionRef} id="cta" className="py-32 px-4 bg-white">
      <div
        className={[
          "max-w-7xl mx-auto",
          "transition-all duration-900 ease-out",
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20",
        ].join(" ")}
      >
        <div className="flex flex-col items-center space-y-7 tracking-tighter mb-16">
          <h2 className="text-5xl">지금 바로 시작하세요</h2>
          <p className="text-center text-muted-foreground text-xl leading-relaxed">
            원하는 자리를 선택하는 새로운 예약 경험,
            <br />
            잇츠파인과 함께 시작해보세요.
          </p>
        </div>
        <div className="flex justify-center gap-5">
          <Button className="py-6 rounded-xl cursor-pointer transition-colors font-bold">
            고객으로 시작하기 <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="px-10 py-6 bg-white text-black font-bold border-black rounded-xl hover:text-white hover:bg-black transition-colors cursor-pointer"
          >
            사장님으로 등록하기
          </Button>
        </div>
      </div>
    </section>
  );
}
