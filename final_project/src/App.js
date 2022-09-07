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

import { useEffect } from "react";
import Detail from "./pages/DetailPage";

import { getCookie } from "./shared/Cookie";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookie !== undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cookie]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/login:id" element={<Login />} />
          <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate replace to='/start' />} />
          <Route path="/searchpage" element={isLoggedIn ? <SearchPage /> : <Navigate replace to='/start' />} />
          <Route path="/detail/:postid" element={isLoggedIn ? <Detail /> : <Navigate replace to='/start' />} />
          <Route path="/postpage" element={isLoggedIn ? <PostPage /> : <Navigate replace to='/start' />} />
          <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <Navigate replace to='/start' />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
