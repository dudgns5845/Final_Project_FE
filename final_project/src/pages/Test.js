import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../apis/Apis";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import { Container, Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../components/Header";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const [confirmationState, setConfirmationState] = useState(false);
  const [postData, setPostData] = useState();
  const navigate = useNavigate();

  // 스크롤을 맨밑으로
  const messagesEndRef = useRef(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  };

  const t = useRef();
  const [username, setUserName] = useState("");
  const param = useParams();

  //이전 메시지 목록 불러오기
  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId, param.nickname)
      .then((response) => {
        setPostData(response.data.data);
        const preTalk = response.data.data.messageList;
        setUserName(response.data.data.nickname);
        preTalk.map((item) => {
          setChatList((prev) => [
            ...prev,
            {
              sender: item.sender,
              senderId: item.senderId,
              message: item.message,
              createdAt: item.createdAt,
            },
          ]);
        });

        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [chatList]);

  // 연결을 관리해보자
  const isConnected = useRef(false);
  const stomp = useRef();

  useEffect(() => {
    const socketJs = new SockJS("http://13.125.71.197/ws-stomp");
    stomp.current = Stomp.over(socketJs);

    stomp.current.connect(headers, () => {
      console.log("연결 성공!");
      stomp.current.subscribe(`/sub/chat/room/${param.roomId}`, (e) => {
        const newMessage = JSON.parse(e.body);
        console.log("adfsdfad", newMessage);
        setChatList((prev) => [
          ...prev,
          {
            sender: newMessage.sender,
            senderId: newMessage.senderId,
            message: newMessage.message,
            createdAt: null,
          },
        ]);
      });
    });

    return () => {
      if (isConnected.current) {
        //연결되어 있으면 끊어
        stomp.current.disconnect(() => {
          isConnected.current = false;
        });
      }
    };
  }, []);

  const handleEnter = () => {
    if (t.current.value === "") {
      return;
    }

    stomp.current.send(
      `/pub/chat/message/${param.roomId}`,
      headers,
      JSON.stringify({
        type: "TALK",
        roomId: param.roomId,
        message: t.current.value,
      })
    );
    t.current.value = "";
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {/* 헤더 */}
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        ></ArrowBackIcon>
        <Box>{postData?.nickname}</Box>
      </Header>
      <Box
        sx={{
          height: "10%",
          backgroundColor: "#D2B48C",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "20px",

          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <img
          style={{ borderRadius: "100%", width: "15vw", height: "15vw" }}
          src={postData == null ? "default-image.jpg" : postData.postImage}
          alt=""
          onClick={() => {
            navigate(`/detail/${postData.postId}`);
          }}
        />

        <Box sx={{ marign: "auto" }}>
          <Typography component="div" variant="h7">
            {postData?.postTitle}
          </Typography>
          <Typography variant="body" color="text.secondary" component="div">
            {postData?.nickname}
          </Typography>
        </Box>
        <button>거래완료</button>
      </Box>
      {/* 메세지 내용 */}
      <Box
        sx={{
          height: "55vh",
          overflow: "auto",
          padding: "20px",
          verticalAlign: "baseline",
        }}
      >
        {chatList.map((item, index) => {
          return <ChatForm item={item} key={index} />;
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={messagesEndRef}
        ></div>
      </Box>

      {/* 메세지 입력 */}

      <Box
        sx={{
          boxShadow: "0 -0.5px 5px 0 rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "15%",
          padding: "0 10px",
          position: "absolute",
          verticalAlign: "baseline",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "S-CoreDream-3Light",
        }}
      >
        {confirmationState ? (
          <input
            placeholder="거래가 완료된 게시물입니다."
            type="text"
            ref={t}
            style={{
              width: "70%",
              height: "30px",
              border: "solid 1px gray",
              borderRadius: "10px",
              fontSize: "large",
              padding: "5px 10px",
            }}
            disabled
          />
        ) : (
          <input
            placeholder="메세지를 입력하세요"
            type="text"
            ref={t}
            style={{
              width: "70%",
              height: "30px",
              border: "solid 1px gray",
              borderRadius: "10px",
              fontSize: "large",
              padding: "5px 10px",
              fontFamily: "S-CoreDream-3Light",
            }}
          />
        )}
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              width: "20%",
              color: "black",
              fontFamily: "S-CoreDream-3Light",
            }}
            onClick={handleEnter}
          >
            전송
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

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

export default Chat;
