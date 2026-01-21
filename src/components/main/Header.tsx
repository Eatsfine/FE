import { useEffect, useMemo, useState } from "react";
import { LoginDialog } from "../auth/LoginDialog";
import { SignupDialog } from "../auth/SignupDialog";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

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

  return (
    <header>
      <div>
        <div>
          <div>
            <span>잇츠파인</span>
          </div>
          <nav>
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div>
            <Button className="opacity-50 text-white hover:bg-gray-100 hover:text-black cursor-pointer transition-all">
              마이페이지
            </Button>
            <Button className="cursor-pointer">로그인</Button>
            <Button>회원가입</Button>
          </div>
          <button aria-label="메뉴열기">
            <Menu className="h-9 w-9" />
          </button>
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
