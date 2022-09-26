import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../apis/Apis";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";

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
    <>
      {chatList.map((item, index) => {
        return <ChatForm item={item} key={index} />;
      })}
      <input id="message" ref={t} />
      <button type="button" value="전송" id="btnSend" onClick={handleEnter}>
        전송
      </button>
    </>
  );
};

export default Chat;
