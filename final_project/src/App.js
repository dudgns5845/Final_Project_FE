import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/LoginPage";

import Start from "./pages/StartPage";
import MyPage from "./pages/MyPage";

import { useEffect, useState } from "react";
import Detail from "./pages/DetailPage";
import SubMyPage from "./pages/SubMyPage";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  const [cookie, setCookie] = useState();
  const ChangeCookie = (cookie) => {
    setCookie(cookie);
    console.log(cookie);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //상태관리 로직 사용 (issue 등록);리듀서 , usecontext
  // useefftect 에서 쿠키 유무를 알 수 있게
  useEffect(() => {
    if (cookie === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cookie]);
  console.log(isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/start"
            element={!isLoggedIn ? <Start /> : <Navigate replace to="/" />}
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login ChangeCookie={ChangeCookie} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <MainPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/searchpage"
            element={
              isLoggedIn ? <SearchPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/detail/:postid"
            element={isLoggedIn ? <Detail /> : <Navigate replace to="/start" />}
          />
          <Route
            path="/postpage"
            element={
              isLoggedIn ? <PostPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/mypage"
            element={isLoggedIn ? <MyPage /> : <Navigate replace to="/start" />}
          />
          <Route
            path="/submypage"
            element={
              isLoggedIn ? <SubMyPage /> : <Navigate replace to="/start" />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
