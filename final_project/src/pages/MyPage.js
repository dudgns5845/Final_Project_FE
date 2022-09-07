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
        <div style={{ gridArea: "edit" }}>
          <Edit>프로필 수정</Edit>
        </div>
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
  margin: auto;
  width: 95vw;
  height: 95vh;
  grid-template-areas:
    "img img nick nick"
    "img img nick nick"
    "img img nick nick"
    "img img nick nick"
    "img img nick nick"
    "edit edit edit edit"
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
  width: 100%;
  height: 70%;

  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  border: 1px solid black;
  border-radius: 100%;
  flex: none;
`;

const NickName = styled.div`
  display: grid;
  grid-area: nick;
  margin: auto auto auto 1.5rem;
`;

const Edit = styled.button`
  display: grid;
  margin: auto auto;
  width: 75vw;
  height: 6vh;
  border: none;
  border-radius: 2%;
  background-color: #d3d3d3;
`;

const Rank = styled.div`
  display: grid;
  grid-area: rank;
  margin: 1rem auto auto auto;
  border-radius: 2%;
  background-color: #d3d3d3;
  width: 100%;
  height: 100%;
`;

const MyPost = styled.div`
  display: grid;
  grid-area: mypost;
  margin-left: 1rem;
  cursor: pointer;
`;

const Zzim = styled.div`
  display: grid;
  grid-area: zzim;
  margin-left: 1rem;
  cursor: pointer;
`;

const LogOut = styled.div`
  display: grid;
  grid-area: out;
  margin-left: 1rem;
  cursor: pointer;
`;
