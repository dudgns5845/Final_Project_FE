import React, { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { Box, IconButton } from "@mui/material";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import apis from "../apis/Apis";

import { useInView } from "react-intersection-observer";

export default function MainPage() {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inView && !loading) {
      // 다음페이지 인덱스 증가
      setPage((page) => page + 1);
      // 증가한 인덱스 데이터 가져오기
      setLoading(true);
      apis
        .getAllPostList(page)
        .then((response) => {
          // console.log(response);
          setPostList([...postList, ...response.data.data.content]);
        })
        .catch((error) => {
          // console.log(error);
        });
      setLoading(false);
      // console.log(page);
      // console.log("hohohoho", postList);
    }
  }, [inView, loading]);

  // console.log("여기", inView);
  const navigate = useNavigate();

  //로드한 데이터 리스트 - > 여기다가 축적해나갈것
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    apis
      .getAllPostList(page)
      .then((response) => {
        console.log(response);
        setPostList(response.data.data.content);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return (
    <>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LocationOnRoundedIcon />
          <span>영등포구</span>
        </div>
        <div>
          <IconButton
            onClick={() => {
              navigate("/searchpage");
            }}
          >
            <SearchRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("/postpage");
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton>
            <NotificationsRoundedIcon />
          </IconButton>
        </div>
      </Header>

      <Box style={{ height: '75vh', width: '100%', overflow: 'auto', marginTop: '8vh', padding: '20px' }}>
        {postList.map((post, idx) => {
          // if (idx === postList.length - 1) {
          //   return <Post ref={ref} post={post} key={idx}></Post>;
          // } else {
          //   return <Post post={post} key={idx}></Post>;
          // }
          return <Post post={post} key={idx}></Post>;
        })}
        <div style={{ height: "100px" }}></div>
        <div style={{ height: "100px" }} ref={ref}></div>
      </Box>

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
