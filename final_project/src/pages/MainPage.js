import React from "react";
import ScreenSize from "../shared/ScreenSize";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { IconButton } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export default function MainPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "5em" }}>
        {test.map((t, idx) => {
          return <Post test={t} key={idx}></Post>;
        })}
      </div>
      <IconButton
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={IconCss}
      >
        <ArrowUpwardRoundedIcon style={ArrowCss} />
      </IconButton>
      <Footer />
    </>
  );
}

const IconCss = {
  position: "fixed",
  width: "2.5em",
  height: "2.5em",
  bottom: "120px",
  right: "30px",
  backgroundColor: "skyblue",
};

const ArrowCss = {
  color: "white",
  width: "1.3em",
  height: "1.3em",
};
