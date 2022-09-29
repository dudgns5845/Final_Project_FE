import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../apis/Apis";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import { Container, Box, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const [confirmationState, setConfirmationState] = useState(false);
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
      <Box
        sx={{
          width: "100%",
          height: "8%",
          position: "absolute",
          backgroundColor: "#FF9387",
          boxShadow: "0 0.5px 0 0 rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <ArrowBackIcon
          style={{ fontSize: "25px", marginLeft: "20px" }}
          onClick={() => {
            navigate("/");
          }}
        ></ArrowBackIcon>

        <Container sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          {username === "" ? "" : username}
        </Container>
      </Box>

      {/* 메세지 내용 */}

      <Box
        sx={{
          height: "79%",
          overflow: "auto",
          padding: "20px",
          verticalAlign: "baseline",
        }}
      >
        <Box sx={{ height: "10%" }}>빈박스</Box>
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
              fontFamily: "PyeongChangPeace-Light",
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
              fontFamily: "PyeongChangPeace-Light",
            }}
          />
        )}
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              width: "20%",
              fontFamily: "PyeongChangPeace-Light",
              color: "black",
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

export default Chat;
