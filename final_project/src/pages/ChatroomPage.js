import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ChatPost from "../components/ChatPost";
import Footer from "../components/Footer";
import apis from "../apis/Apis";

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const param = useParams();

  const [chatList, setChatList] = useState([]);
  // const [test, setTest] = useState(
  //   {
  //     anoterId: '상대방아이디',
  //     anotherRagion: '상대방지역',
  //     time: '1시간전',
  //     lastMessage : '안녕하세요! 아직 판매중이신가요?',
  //   }
  // )
  const dummy = [
    {
      nickname: "상대방아이디",
      location: "영등포구",
      time: "1시간전",
      lastMessage: "안녕하세요! 아직 판매중이신가요?",
      profileUrl:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      roomId: "1",
    },
    {
      anoterId: "상대방아이디2",
      anotherRegion: "동작구",
      time: "14시간전",
      lastMessage: "감사합니다",
      postImageUrl: "https://www.nicepng.com/png/full/317-3179513_21-.png",
      roomId: "2",
    },
  ];
  useEffect(() => {
    apis
      .chatRooms(param.roomId)
      .then((response) => {
        console.log(response);
        setChatList(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header>
        <span style={{ margin: "auto 0 auto 40%" }}>채팅</span>
        <ArrowBackIcon
          style={{
            position: "absolute",
            fontSize: "25px",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
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
  margin: 5rem 0.5rem 1rem 0.5rem;
  width: 90vw;
  height: 90vh;
`;
