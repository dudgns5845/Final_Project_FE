import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../apis/Apis";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import { TextField, Container, Box, Button } from '@mui/material';
import { display } from '@mui/system';

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  };
  const [msg, setMsg] = useState({
    type: "TALK",
    roomId: "29861f1f-4fd5-4a91-a6e3-3f1ccd170106",
    message: "aadsf",
  });
  const t = useRef();

  const param = useParams();

  //이전 메시지 목록 불러오기
  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId)
      .then((response) => {
        setChatList(response.data.data.messageList);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const socketJs = new SockJS("http://13.125.71.197/ws-stomp");
  const stomp = Stomp.over(socketJs);

  useEffect(() => {
    stomp.connect(
      headers,
      () => {
        stomp.subscribe(
          "/sub/chat/room/29861f1f-4fd5-4a91-a6e3-3f1ccd170106",
          (e) => {
            const newMessage = JSON.parse(e.body);
            setChatList((prev) => [
              ...prev,
              {
                type: newMessage.type,
                sender: newMessage.sender,
                message: newMessage.message,
                createdAt: null,
              },
            ]);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handleEnter = () => {
    stomp.send(
      "/pub/chat/message/29861f1f-4fd5-4a91-a6e3-3f1ccd170106",
      headers,
      JSON.stringify({
        type: "TALK",
        roomId: "29861f1f-4fd5-4a91-a6e3-3f1ccd170106",
        message: t.current.value,
      })
    );

    console.log("안녕");
  };

  return (

    <Box>
      {/* 헤더 */}
      <Box sx={{
        width: '100%', height: '10vh', position: 'absolute', top: '0',
      }}>
        UserName
      </Box>

      {/* 메세지 내용 */}
      <Box sx={{ height: '70vh', backgroundColor: 'gray', overflow: 'auto', marginTop: '8vh', padding: '20px' }}>
        {chatList.map((item, index) => {
          return <ChatForm item={item} key={index} />;
        })}
      </Box>

      {/* 메세지 입력 */}
      <footer>
        <Box sx={{
          width: '100%', height: '5vh', padding: '10px', position: 'absolute',
          bottom: '0'
        }}>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={2}
            ref={t}
            sx={{ width: '70%', height: '3rem' }}
          />
          <Button variant="contained" sx={{ height: '3rem', width: '20%' }} onClick={handleEnter}>
            전송
          </Button>
        </Box>
      </footer>
    </Box>
  );
};

export default Chat;
