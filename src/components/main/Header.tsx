import { useEffect, useMemo, useState } from "react";
import { LoginDialog } from "../auth/LoginDialog";
import { SignupDialog } from "../auth/SignupDialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import { Menu } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // const [mobileOpen, setMobileOpen] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  return (
    <header
      className={`fixed z-50 top-0 left-0 right-0 transition-all ${headerClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <span className={`text-[24px] tracking-tight ${brandClass}`}>
            잇츠파인
          </span>
          <nav className="hidden min-[420px]:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors ${navLinkClass}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden min-[420px]:flex items-center gap-3">
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
          {/* <button
            className={`min-[420px]:hidden p-2 ${brandClass}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="메뉴열기"
          >
            <Menu className="h-9 w-9" />
          </button> */}
        </div>
      </div>
      {/*  화면 구현후, mobile 구현하기 */}
      {/* {mobileOpen && (
        <div>
          <div>
            <div>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <Button>로그인</Button>
              <Button>회원가입</Button>
            </div>
          </div>
        </div>
      )} */}

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
