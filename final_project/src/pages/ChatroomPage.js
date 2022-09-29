import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatPost from "../components/ChatPost";
import Footer from "../components/Footer";
import apis from "../apis/Apis";

export default function ChatRoomPage() {
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    apis
      .chatRooms()
      .then((response) => {
        console.log(response);
        setChatList(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header>
        <h4>채팅</h4>
      </Header>
      <Container>
        {chatList.map((post, idx) => {
          return <ChatPost post={post} key={idx} />;
        })}
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  width: 90vw;
  height: 90vh;
`;
