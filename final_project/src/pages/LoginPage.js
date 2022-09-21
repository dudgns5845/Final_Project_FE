import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, Link } from "react-router-dom";

import apis from "../apis/Apis";
import { setCookie } from "../shared/Cookie";

const ariaLabel = { "aria-label": "description" };

export default function Login({ ChangeCookie }) {
  // login, register 페이지 스위치
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  // 아이디, 비밀번호 등
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [region, setRegion] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  // 조건 오류 메시지
  const [userIdMessege, setUserIdMessege] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickname, setIsNickName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // MUI
  const state = {
    open: false,
    errorMessage,
    vertical: "top",
    horizontal: "center",
  };

  const [snackOpen, setsnackOpen] = useState(false);

  const handleClose = () => {
    setsnackOpen(false);
  };
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (errorMessage === "로그인 성공") {
      navigate("/");
    }
  }, [errorMessage]);
  const onSubmitHandler = (e) => {
    if (e.target.innerText === "로그인") {
      if (!isUserId) {
        return setErrorMessage("이메일을 확인해주세요");
      } else if (!isPassword) {
        return setErrorMessage("비밀번호를 확인해주세요");
      } else {
        const UserData = {
          email: userId,
          password: password,
        };

        apis
          .loginUser(UserData)
          .then((response) => {
            console.log(response);
            if (!response.data.success) {
              setErrorMessage("아이디와 비밀번호를 확인하세요");
              return;
            } else if (response.data.success) {
              setErrorMessage("로그인 성공");

              setCookie(
                "accessToken",
                response.data.data.token.accessToken,
                response.data.data.token.accessTokenExpiresIn
              );

              ChangeCookie(response.data.data.token.accessToken);

              setCookie("refreshToken", response.data.data.token.refreshToken);

              setCookie(
                "nickname",
                response.data.data.nickname,
                response.data.data.token.accessTokenExpiresIn
              );

              setCookie(
                "id",
                response.data.data.id,
                response.data.data.token.accessTokenExpiresIn
              );
            }

            // alert(errorMessage);
            // navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
          })
          .then((response) => {
            alert(errorMessage);
            if (errorMessage === "로그인 성공") {
              navigate("/");
            }
          });
      }
    }
  };

  // 이메일 조건 확인
  const onChangeUserId = (e) => {
    const idRegex =
      /^[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+@+[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+\.+[a-zA-Z]{2,10}$/;
    const idCurrent = e.target.value;
    setUserId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setUserIdMessege("이메일 형식이 아닙니다.");
      setIsUserId(false);
    } else {
      setUserIdMessege("올바른 이메일 형식입니다.");
      setIsUserId(true);
    }
  };
  // 비밀번호 조건 확인
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "알파벳+숫자+특수문자 조합으로 8자리 이상 15자리 이하로 입력해주세요"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 형식입니다");
      setIsPassword(true);
    }
  }, []);

  useEffect(() => {
    if (passwordConfirm.length > 0) {
      if (password === passwordConfirm) {
        setIsPasswordConfirm(true);
        setPasswordConfirmMessage("비밀번호 확인 완료");
      } else {
        setIsPasswordConfirm(false);
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      }
    }
  }, [password, passwordConfirm]);

  // login register 스위치
  const onChangeHandler = (e) => {
    e.preventDefault();
    auth ? setAuth(false) : setAuth(true);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "80vw",
        height: "100%",
        marginTop: "2vh",
        padding: "3vh",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <h2>로그인</h2>
      <form>
        <p>이메일</p>
        <Input
          fullWidth
          placeholder="이메일을 입력하세요"
          inputProps={ariaLabel}
          onChange={onChangeUserId}
        />
        <p>비밀번호</p>
        <Input
          fullWidth
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
        />
        <br />
        <div>
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              setsnackOpen(true);
              onSubmitHandler(e);
            }}
          >로그인
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={snackOpen}
            autoHideDuration={2000}
            message={errorMessage}
            onClose={handleClose}
            key={state.vertical + state.horizontal}
          ></Snackbar>
        </div>
      </form>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        {/* <Link to='/signin'>회원가입하러 가기</Link> */}
        {/* <Button variant="text" onClick={onChangeHandler}>
          회원가입하러 가기
        </Button> */}
        <Button variant="text" onClick={() => { navigate('/signin') }}>
          회원가입하러 가기
        </Button>

      </div>
    </div>
  );
}


const guList = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"]
