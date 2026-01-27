import { useEffect, useMemo, useState } from "react";
import { LoginDialog } from "../auth/LoginDialog";
import { SignupDialog } from "../auth/SignupDialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const nav = useNavigate();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "소개", href: "/" },
      { label: "식당 예약", href: "/search" },
      { label: "내 가게 관리", href: "/owner" }, //임시 위치.
      { label: "고객센터", href: "/customer-support" },
    ],
    [],
  );

  useEffect(() => {
    const heroEI = document.getElementById("intro");
    if (!heroEI) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      },
    );
    observer.observe(heroEI);
    return () => observer.disconnect();
  }, []);

  // 햄버거 메뉴 열려있을때 스크롤방지용
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const go = (to: string) => {
    setMobileOpen(false);
    nav(to);
  };

  const headerClass = scrolled
    ? "bg-white/90 backdrop-blur border-b border-border"
    : "bg-transparent border-b border-white/10";

  const brandClass = scrolled ? "text-[#191919]" : "text-white";

  const navLinkClass = scrolled
    ? "text-[#191919] hover:text-[#191919]/70"
    : "text-white hover:text-white/30";

  const ghostBtnClass = scrolled
    ? "cursor-pointer text-[#191919] hover:bg-black/5 hover:text-[#191919]"
    : "cursor-pointer text-white hover:bg-white/20 hover:text-black";

  const signupBtnClass = scrolled
    ? "cursor-pointer rounded-3xl bg-[#2196F3] text-white hover:bg-[#1E88E5] px-6 pr-6 font-semibold"
    : "cursor-pointer rounded-3xl bg-white text-[#2196F3] hover:bg-white/70 px-6 pr-6 font-semibold";

  const mobilePanelText = "text-[#191919]";
  const mobileItemClass =
    "w-full  px-4 py-3 text-left text-lg transition-colors hover:text-[#2196F3] cursor-pointer rounded-xl";

  return (
    <header
      className={`fixed z-50 top-0 left-0 right-0 transition-all ${headerClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => go("/")}
            className={`text-[24px] tracking-tight ${brandClass}`}
          >
            잇츠파인
          </button>
          <nav className="hidden lg:flex items-center gap-8 whitespace-nowrap">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors whitespace-nowrap ${navLinkClass}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
            <Button
              variant="ghost"
              onClick={() => nav("/mypage")}
              className={ghostBtnClass}
            >
              마이페이지
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLoginOpen(true)}
              className={ghostBtnClass}
            >
              로그인
            </Button>
            <Button
              onClick={() => setSignupOpen(true)}
              className={signupBtnClass}
            >
              회원가입
            </Button>
          </div>
          <button
            type="button"
            className={`lg:hidden p-2 rounded-lg ${brandClass}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="메뉴열기"
          >
            {mobileOpen ? (
              <X className="h-7 w-7 cursor-pointer hover:text-black/60 hover:scale-110 transition" />
            ) : (
              <Menu className="h-7 w-7 cursor-pointer hover:text-black/60 hover:scale-110 transition" />
            )}
          </button>
        </div>
      </div>
      {/* "transition-[max-height,opacity] duration-300 ease-out",
          mobileOpen ? "max-h-130 opacity-100" : "max-h-0 opacity-0", */}
      <div
        className={[
          "lg:hidden overflow-hidden",
          mobileOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 top-20 bg-black/20"
        />
        <div className="absolute left-0 right-0 top-full">
          <div className="mx-4 mb-4 rounded-2xl bg-white/95 backdrop-blur border border-black/5 shadow-lg">
            <div className={`p-3 ${mobilePanelText}`}>
              <div className="flex flex-col gap-1">
                {navItems.map((item, idx) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => go(item.href)}
                    className={mobileItemClass}
                    style={{
                      transitionDelay: mobileOpen ? `${idx * 60}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                className="text-lg h-12 mt-2 w-full cursor-pointer rounded-xl bg-black/5 hover:bg-black/10 transition-colors"
                onClick={() => go("/mypage")}
              >
                마이페이지
              </Button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="text-lg h-12 w-full cursor-pointer rounded-xl border-black/15 transition-colors"
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  로그인
                </Button>
                <Button
                  className="text-lg h-12 w-full cursor-pointer rounded-xl bg-[#2196F3] hover:bg-[#1E88E5] transition-colors"
                  onClick={() => {
                    setMobileOpen(false);
                    setSignupOpen(true);
                  }}
                >
                  회원가입
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginDialog
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => {
          setSignupOpen(true);
        }}
      />
      <SignupDialog
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={() => {
          setLoginOpen(true);
        }}
      />
    </header>
  );
}
