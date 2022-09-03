import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/login" element={<Login />} />
        <Route path="*" element={<Main />} />
        <Route path="/postpage" element={<PostPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
