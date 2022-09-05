import React from "react";
import ScreenSize from "../shared/ScreenSize";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const write = () => {
    navigate("/login:write");
  };
  const register = () => {
    navigate("/login:register");
  };

  return (
    <ScreenSize>
      <h1>메인페이지</h1>
      <button onClick={write}>로그인</button>
      <button onClick={register}>회원가입</button>
    </ScreenSize>
  );
}
