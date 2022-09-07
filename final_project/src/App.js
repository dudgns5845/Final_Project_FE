import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/LoginPage";

import Start from "./pages/StartPage";
import MyPage from "./pages/MyPage";

import { useEffect } from "react";
import Detail from "./pages/DetailPage";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/start" element={<Start />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:postid" element={<Detail />} />
          <Route path="/postpage" element={<PostPage />} />
          <Route path="/login:id" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
