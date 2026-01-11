import { LoginDialog } from "@/components/auth/LoginDialog";
import { SignupDialog } from "@/components/auth/SignupDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Intro = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <div className="p-4">
        소개 페이지
        <br />
        <Button>버튼</Button>
      </div>

      <div className="flex p-4 gap-4">
        <Button
          className="cursor-pointer"
          onClick={() => {
            setIsLoginOpen(true);
          }}
        >
          로그인
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setIsSignupOpen(true);
          }}
        >
          회원가입
        </Button>
      </div>

      <SignupDialog
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
    </>
  );
};

export default Intro;
