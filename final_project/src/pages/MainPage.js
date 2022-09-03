import React from "react";
import ScreenSize from "../shared/ScreenSize";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const write = () => {
    navigate("/login:write");
  };
  const reig = () => {
    navigate("/login:reig");
  };
  //   const onRegister = () => {
  //     navigate("/login", [false]);
  //   };
  //   const onCl = () => {
  //   };
  return (
    <ScreenSize>
      <h1>메인페이지</h1>
      <button onClick={write}>로그인</button>
      <button onClick={reig}>회원가입</button>
    </ScreenSize>
  );
}
