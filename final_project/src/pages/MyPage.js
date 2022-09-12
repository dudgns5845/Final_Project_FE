import { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "../components/Modal";

import { CompressOutlined } from "@mui/icons-material";

export default function MyPage() {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [myNick, setMyNick] = useState("장호");
  const [myImage, setMyImage] = useState(
    "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
  );
  const Open = () => {
    setEditProfile(true);
  };
  const ChangeNick = (e) => {
    setMyNick(e.target.value);
    console.log(myNick);
  };
  const close = () => {
    setEditProfile(false);
    setMyNick("장호");
    setMyImage(
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
    );
  };
  const onFileChange = (e) => {
    setMyImage(e.target.files[0]);
  };
  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const imgUrl = URL.createObjectURL(imgSelectList[0]);
    setMyImage(imgUrl);
  };
  const ClickHandler = () => {
    console.log(myNick, myImage);
    setEditProfile(false);
  };
  // const ChangeNick = () => {
  //   const nickRef = nick.current.value;
  //   setNickRef(nickRef);
  //   console.log(nickRef);
  // };
  return (
    <>
      <Container>
        <Header>
          <ArrowBackIcon
            style={{ fontSize: "25px" }}
            onClick={() => {
              navigate("/");
            }}
          />
          <h4>내 프로필</h4>
          <button></button>
        </Header>
        <Image src={myImage} />
        <NickName> {myNick} 님</NickName>
        <Edit onClick={Open}>프로필 수정</Edit>
        <Rank>랭크 정보(거래 횟수 기준)</Rank>
        <MyPost>내가 작성한 게시글</MyPost>
        <Zzim>내가 찜한 게시글</Zzim>
        <LogOut>로그아웃</LogOut>
      </Container>
      <Modal visible={editProfile}>
        <label onChange={AddImage}>
          <Image style={{ marginTop: "5vh" }} src={myImage}></Image>
          <input
            type="file"
            accept="image/*"
            encType="multipart/form-data"
            hidden
            onChange={onFileChange}
          />
        </label>
        <InputSt
          type="text"
          onChange={ChangeNick}
          name="nick"
          placeholder={myNick}
        />
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <Button
            style={{
              fontSize: "20px",
              backgroundColor: "#FFBA46",
              marginRight: "20PX",
              borderRadius: "5px",
            }}
            variant="contained"
            component="label"
            onClick={ClickHandler}
          >
            수정하기
          </Button>
          <Button
            style={{
              fontSize: "20px",
              backgroundColor: "#FFBA46",

              marginRight: "20PX",
              borderRadius: "5px",
            }}
            onClick={close}
          >
            닫기
          </Button>
        </div>
      </Modal>
    </>
  );
}

const Container = styled.div`
  display: grid;
  margin: auto;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    ". ."
    "img nick"
    "edit edit"
    "rank rank"
    "mypost mypost"
    "zzim zzim"
    "out out"
    ". .";
`;
const Image = styled.img`
  display: grid;
  grid-area: img;
  margin: auto;
  width: 10rem;
  height: 10rem;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: 100%;
  flex: none;
`;

const NickName = styled.div`
  display: grid;
  grid-area: nick;
  margin: auto;
  width: 5rem;
  height:5rem
  font-size: 20px;
  text-align: left;
`;

const Edit = styled.button`
  display: grid;
  grid-area: edit;
  margin: auto;
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  width: 75vw;
  height: 8vh;
  border: none;
  border-radius: 2%;
  background-color: gainboro;
`;

const Rank = styled.div`
  display: grid;
  grid-area: rank;
  text-indent: 8px;
  margin: auto;
  border-radius: 2%;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
`;

const MyPost = styled.div`
  display: grid;
  grid-area: mypost;
  margin: auto;
  cursor: pointer;
`;

const Zzim = styled.div`
  display: grid;
  grid-area: zzim;
  margin: auto;
  cursor: pointer;
`;

const LogOut = styled.div`
  display: grid;
  grid-area: out;

  margin: auto;
  cursor: pointer;
`;

const Button = styled.button`
  font-size: 15px;
  display: inline-block;
  border: none;
  margin-top: 2vh;

  background-color: transparent;
  color: white;
  &:hover {
    background-color: gray;
    border-radius: 10px;
  }
`;

const InputSt = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
  margin-top: 4vh;
  margin-left: 18vw;
  width: 60%;
  height: 30px;
  text-indent: 8px;
  &:focus {
    outline: 1px solid gray;
  }
`;
