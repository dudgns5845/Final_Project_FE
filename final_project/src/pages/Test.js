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

  // 스크롤을 맨밑으로
  const messagesEndRef = useRef(null)

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  };

  const t = useRef();

  const param = useParams();

  //이전 메시지 목록 불러오기
  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId)
      .then((response) => {
        const preTalk = response.data.data.messageList
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
        })

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

    stomp.current.connect(
      headers,
      () => {
        console.log('연결 성공!');
        stomp.current.subscribe(
          `/sub/chat/room/${param.roomId}`,
          (e) => {
            const newMessage = JSON.parse(e.body);
            console.log('adfsdfad', newMessage)
            setChatList((prev) => [
              ...prev,
              {
                sender: newMessage.sender,
                senderId: newMessage.senderId,
                message: newMessage.message,
                createdAt: null,
              },
            ]);
          }
        );
      }
    )

    return () => {
      if (isConnected.current) {
        //연결되어 있으면 끊어
        stomp.current.disconnect(() => {
          isConnected.current = false;
        })
      }
    };
  }, []);

  const handleEnter = () => {
    if (t.current.value === '') {
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
    t.current.value = '';
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
      <Box sx={{ height: '70vh', backgroundColor: 'gray', overflow: 'auto', marginTop: '8vh', padding: '20px', verticalAlign: 'baseline' }}>
        {chatList.map((item, index) => {
          return <ChatForm item={item} key={index} />;
        })}
        <div style={{ float: "left", clear: "both" }}
          ref={messagesEndRef}>
        </div>
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
            inputRef={t}
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
