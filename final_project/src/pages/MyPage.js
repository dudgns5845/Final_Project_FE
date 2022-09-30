import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Modal from "../components/Modal";
import apis from "../apis/Apis";
import { deleteCookie } from "../shared/Cookie";
import Footer from "../components/Footer";
import ScreenSize from "../shared/ScreenSize";

export default function MyPage() {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [myNick, setMyNick] = useState();
  const imgfile = useRef();
  const [isNickname, setIsNickName] = useState(false);
  const [tmpNick, setTmpNick] = useState(myNick);
  const [myImage, setMyImage] = useState(
    "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
  );
  const [tmpImage, setTmpImage] = useState(myImage);

  const Open = () => {
    setEditProfile(true);
  };
  const ChangeNick = (e) => {
    setTmpNick(e.target.value);
  };
  const close = () => {
    setEditProfile(false);
  };

  const checkNickname = { nickname: tmpNick };
  const onDoublingNickHandler = (e) => {
    e.preventDefault();
    if (tmpNick.length === 0) {
      return alert("닉네임을 입력해주세요");
    } else {
      apis
        .nicknameCheck(checkNickname)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setIsNickName(true);

            alert("사용 가능한 닉네임입니다");
          } else {
            alert("이미 사용중인 닉네임입니다");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    apis
      .getProfile()
      .then((response) => {
        console.log(response);
        setTmpNick(response.data.data.nickname);
        setTmpImage(response.data.data.profileUrl);
        setMyNick(response.data.data.nickname);
        setMyImage(response.data.data.profileUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const url = URL.createObjectURL(imgSelectList[0]);
    setTmpImage(url);
  };

  const ClickHandler = (e) => {
    if (e.target.name === "edit") {
      const postData = new FormData();
      const nicknames = {
        nickname: tmpNick,
      };
      if (imgfile.current.files[0] === undefined) {
        postData.append("imageFile", "");
      } else {
        postData.append("imageFile", imgfile.current.files[0]);
      }
      postData.append(
        "requestDto",
        new Blob([JSON.stringify(nicknames)], {
          type: "application/json",
        })
      );
      console.log(postData);
      console.log(tmpNick);
      console.log(imgfile.current.files[0]);
      apis
        .editProfile(postData)
        .then((response) => {
          console.log(response);
          // navigate(`/detail/${response.data.data.id}`);
          setMyNick(tmpNick);
          setMyImage(tmpImage);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setEditProfile(false);
        });
    } else {
      return;
    }
  };
  //  const SettingFunction =(e)=>{
  //     if(e.target.value)
  //  }

  const LogOutAction = () => {
    apis
      .logOutUser()
      .then((response) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("id");
        deleteCookie("nickname");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ScreenSize>
        <Header>
          <h4>프로필</h4>
        </Header>
        {/* 유저 프로필 */}
        <Div>
          <Image src={myImage} />
          <NickName>{myNick}</NickName>
        </Div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "3vh",
            height: "10vh",
          }}
        >
          <Edit onClick={Open}>프로필 수정</Edit>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            height: "50vh",
          }}
        >
          <Setting value="write" onClick={() => navigate("/submypage:mywrite")}>
            내가 작성한 게시글
            <ArrowForwardIosRoundedIcon />
          </Setting>

          <Setting
            value="zzim"
            onClick={() => navigate("/submypage:mybookmark")}
          >
            내가 찜한 게시글
            <ArrowForwardIosRoundedIcon />
          </Setting>
          <Setting value="logout" onClick={LogOutAction}>
            로그아웃
          </Setting>
        </div>
      </ScreenSize>

      <Modal visible={editProfile}>
        <Header>
          <ArrowBackIcon onClick={close} />
          <h4>프로필 수정</h4>
        </Header>
        <div style={{ display: "flex", justifyContetns: "center" }}>
          <label onChange={AddImage}>
            <ChangeImage src={tmpImage} />
            <input
              type="file"
              accept="image/*"
              encType="multipart/form-data"
              hidden
              ref={imgfile}
            />
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <InputSt
            type="text"
            onChange={ChangeNick}
            name="nick"
            placeholder={tmpNick}
          />

          {isNickname ? (
            <Button
              style={{
                fontSize: "15px",
                backgroundColor: "#FFBA46",
                marginRight: "10px",
                marginLeft: "5px",
                borderRadius: "5px",
                height: "30px",
                marginTop: "4.5vh",
              }}
              disabled
              variant="outlined"
              onClick={(e) => {
                onDoublingNickHandler(e);
              }}
            >
              중복 확인
            </Button>
          ) : (
            <Button
              style={{
                fontSize: "15px",
                backgroundColor: "#FFBA46",
                marginRight: "10px",
                marginLeft: "5px",
                borderRadius: "5px",
                height: "30px",
                marginTop: "4.5vh",
              }}
              variant="outlined"
              onClick={(e) => {
                onDoublingNickHandler(e);
              }}
            >
              중복 확인
            </Button>
          )}
        </div>
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
            name="edit"
          >
            수정하기
          </Button>
        </div>
      </Modal>
      <Footer />
    </>
  );
}

const Image = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  background-size: cover;
  border: 1px solid gainsboro;
  margin-right: 5vw;
  border-radius: 50%;
`;
const NickName = styled.div`
  width: 4rem;
  height: 1.5rem;
  font-size: 1em;
  font-weight: bold;
  margin-top: 1vh;
`;

const Edit = styled.button`
  text-align: center;
  vertical-align: middle;
  color: gray;
  width: 90vw;
  height: 5vh;
  border: none;
  border-radius: 5px;
  background-color: gainboro;
`;

const Setting = styled.div`
  cursor: pointer;
  border-top:0.5px solid  #dcdcdc;
  height: 15vh;
  margin: 2vh 5vw;
  padding-top:3vh;
  text-indent: 2vw;
  font-weight: 300;
    justify-content: space-between;

   &:hover {
    background-color: gainsboro;
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
  margin-left: 20vw;
  width: 50%;
  height: 30px;
  text-indent: 8px;
  &:focus {
    outline: 1px solid gray;
  }
`;

const Div = styled.div`
  display: flex;
  height: 10vh;
  margin: 5vh 4vw 0 5vw;
  align-items: center;
`;

const ChangeImage = styled.img`
  width: 8rem;
  height: 8rem;
  background-size: cover;
  border: 1px solid gainsboro;
  margin: 2vh;
  border-radius: 50%;
`;
