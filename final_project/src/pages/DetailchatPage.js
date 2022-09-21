import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ChatForm from "../components/ChatForm";
import apis from "../apis/Apis";
export default function DetailChatPage() {
  const navigate = useNavigate();
  const param = useParams();

  const [chat, setChat] = useState("");
  const [tmpchat, setTmpChat] = useState("");

  const [test, setTest] = useState([{}]);
  const ChangeChat = (e) => {
    setChat(e.target.value);
  };
  const ChangeUserChat = (e) => {
    setTmpChat(e.target.value);
  };

  const SendChat = () => {
    setTest([...test, { id: "my", text: chat }]);
  };
  // const SendOtherChat = () => {
  //   setTest([...test, { id: "user", text: tmpchat }]);
  // };

  console.log(param);
  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId)
      .then((response) => {
        console.log(response);
        setTest([...test, response.data.data.messageList]);
      })
      .catch((error) => console.log(error));
  }, [param]);
  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <h2>user</h2>
        <h3>user</h3>
      </Header>
      <Wrap>
        {test.map((item, index) => {
          return <ChatForm item={item} key={index} />;
        })}
        {/* <ChatForm></ChatForm> */}

        <div
          style={{
            justifyContent: "space-between",
            display: "fixed",
            bottom: "100%",
            overflow: "auto",
          }}
        >
          <input
            type="text"
            placeholder="내 채팅창"
            onChange={ChangeChat}
          ></input>
          <button onClick={SendChat}>전송</button>
          {/* <input
            type="text"
            placeholder="상대 채팅방"
            onChange={ChangeUserChat}
          ></input>
          <button onClick={SendOtherChat}>전송</button> */}
        </div>
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  padding: auto;
  margin-top: 10vh;
`;
