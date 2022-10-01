import React, { useEffect, useRef } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { Box, IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import apis from "../apis/Apis";
import { getCookie } from "../shared/Cookie";

import { useInView } from "react-intersection-observer";

export default function MainPage() {
  const [listening, setListening] = useState(false);
  const [alarmIconChange, setAlarmChange] = useState(
    <NotificationsNoneOutlinedIcon />
  );

  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(undefined);
  const [userId, setUserId] = useState(getCookie("id"));

  const [ref, inView] = useInView();
  //로드한 데이터 리스트 - > 여기다가 축적해나갈것
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const firstBox = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("매번 실행되는지");
    console.log("listening", listening);

    let eventSource = undefined;

    if (!listening) {
      //   eventSource = new EventSource("http://13.125.71.197/subscribe/2", {withCredentials: true}); //구독
      eventSource = new EventSource(
        `http://13.125.71.197/subscribe/${userId}`,
        { withCredentials: true }
      ); //구독
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        console.log("result", event.data);
        setAlarmChange(<NotificationAddRoundedIcon />);
        setValue(event.data);
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);
  useEffect(() => {
    if (inView && !loading) {
      // 다음페이지 인덱스 증가
      setPage((page) => page + 1);
      // 증가한 인덱스 데이터 가져오기
      setLoading(true);
      apis
        .getAllPostList(page)
        .then((response) => {
          setPostList([...postList, ...response.data.data.content]);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [inView, loading]);

  return (
    <>
      <Header>
        <img src="logo_00.jpg" alt="우가우가" style={logoCss} />
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
              navigate("/alarmpage");
            }}
          >
            {alarmIconChange}
          </IconButton>
        </div>
      </Header>

      <Box
        style={{
          height: "85vh",
          overflowY: "scroll",
        }}
      >
        {postList.map((post, idx) => {
          if (idx === 0) {
            return <Post post={post} key={idx} injRef={firstBox}></Post>;
          } else {
            return <Post post={post} key={idx}></Post>;
          }
        })}
        <div style={{ height: "100px" }}></div>
        <div style={{ height: "100px" }} ref={ref}></div>
      </Box>
      <IconButton
        onClick={() => {
          navigate("/postpage");
        }}
        style={IconCss}
      >
        <CreateRoundedIcon style={ArrowCss} />
      </IconButton>

      <Footer firstBox={firstBox} />
    </>
  );
}

const IconCss = {
  position: "fixed",
  width: "2.4em",
  height: "2.4em",
  top: "80vh",
  right: "8vw",
  backgroundColor: "#CED0CF",
  border: "1px solid #CED0CF",
};

const ArrowCss = {
  color: "#A25C01",
  width: "1.12em",
  height: "1.2em",
};

const logoCss = {
  width: "8vw",
  height: "5vh",
};
