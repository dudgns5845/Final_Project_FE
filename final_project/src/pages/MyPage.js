import React, { useRef } from "react";
import styled from "styled-components";

// import Header from "../components/Header";

export default function MyPage() {
  const image = useRef([
    {
      src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    },
  ]);
  return (
    <>
      {/* <Header /> */}
      <Container>
        <Image
          style={{ backgroundImage: `url(${image.current[0].src})` }}
        ></Image>
        <NickName>닉네임</NickName>
        <Edit>프로필 수정</Edit>
        <Rank>랭크 정보(거래 횟수 기준)</Rank>
        <MyPost>내가 작성한 게시글</MyPost>
        <Zzim>내가 찜한 게시글</Zzim>
        <LogOut>로그아웃</LogOut>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-areas:
    "img img nick nick"
    "img img nick nick"
    "img img nick nick"
    "profile profile profile profile"
    ". . . ."
    "rank rank rank rank"
    "rank rank rank rank"
    "rank rank rank rank"
    ". . . ."
    "mypost mypost mypost mypost"
    "zzim zzim zzim zzim"
    "out out out out";
`;

const Image = styled.img`
  display: grid;
  grid-area: img;
  margin: auto;
  width: 30vw;
  height: 18vh;

  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  border: 1px solid #ffffff;
  flex: none;
`;

const NickName = styled.div`
  display: grid;
  grid-area: nick;
  margin: auto 0;
`;

const Edit = styled.button`
  display: grid;
  grid-area: profile;
`;

const Rank = styled.div`
  display: grid;
  grid-area: rank;
`;

const MyPost = styled.div`
  display: grid;
  grid-area: mypost;
`;

const Zzim = styled.div`
  display: grid;
  grid-area: zzim;
`;

const LogOut = styled.div`
  display: grid;
  grid-area: out;
`;
