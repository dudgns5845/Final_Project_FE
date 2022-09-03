import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login:id" element={<Login />} />

          {/* <Route path="/postpage" element={<PostPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
