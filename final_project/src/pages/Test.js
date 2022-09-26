import React, { useCallback, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../apis/Apis";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const Chat = () => {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  const param = useParams();

  const ws = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
  const stomp = Stomp.over(ws.current);
  useEffect(() => {
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

  //   const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
  //         ${reset}
  //     `;

  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.value);
  };

  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId)
      .then((response) => {
        console.log(response);
        setChatt([...chatt, response.data.data]);
      })
      .catch((error) => console.log(error));
  }, [param]);

  const webSocketLogin = useCallback(() => {
    ws.current = new SockJS("http://13.125.71.197/ws-stomp");

    stomp.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }

    if (msg !== "") {
      const data = {
        type: "TALK",
        sender: "영훈",
        roomId: "29861f1f-4fd5-4a91-a6e3-3f1ccd170106",
        message: new Date().toLocaleString(),
        createdAt: "2000-10-31T01:30:00.000-05:00",
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if (stomp.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        stomp.onopen = () => {
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          stomp.send("http://http://13.125.71.197/pub/chat/message", temp);
        };
      } else {
        stomp.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");
  });
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket

  return (
    <>
      {/* <GlobalStyle /> */}
      <div id="chat-wrap">
        <div id="chatt">
          <h1 id="title">WebSocket Chatting</h1>
          <br />
          <div id="talk">
            <div className="talk-shadow"></div>
            {chatt.map((item, index) => {
              return <ChatForm item={item} key={index} />;
            })}
          </div>
          <input
            disabled={chkLog}
            placeholder="이름을 입력하세요."
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div id="sendZone">
            <textarea
              id="msg"
              value={msg}
              onChange={onText}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  send();
                }
              }}
            ></textarea>
            <input type="button" value="전송" id="btnSend" onClick={send} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
