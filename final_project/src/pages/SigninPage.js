import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import apis from "../apis/Apis";
import { setCookie } from "../shared/Cookie";

const ariaLabel = { "aria-label": "description" };

export default function Signin({ ChangeCookie }) {
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
        if (e.target.innerText === "회원가입") {
            if (!isAuth) {
                return setErrorMessage("이메일 인증을 진행해주세요");
            } else if (!isPasswordConfirm) {
                return setErrorMessage("비밀번호가 일치하지 않습니다");
            } else if (nickName.length === 0) {
                return setErrorMessage("닉네임을 입력해주세요");
            } else if (passwordConfirm.length === 0) {
                return setErrorMessage("비밀번호 확인을 입력해주세요");
            } else if (!isNickname) {
                return setErrorMessage("닉네임 중복확인을 해주세요");
            } else {
                const UserData = {
                    email: userId,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    nickname: nickName,
                    location: region,
                };

                apis
                    .registerUser(UserData)
                    .then((response) => {
                        console.log(response);
                        setErrorMessage("회원가입 성공");
                        setAuth(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        return setErrorMessage("다시 시도해주세요");
                    });
            }
        }
    };

    const buttonsTotal = (
        <>
            <Button
                fullWidth
                variant="contained"
                onClick={(e) => {
                    setsnackOpen(true);
                    onSubmitHandler(e);
                }}
            >
                {auth ? "회원가입" : "로그인"}
            </Button>
        </>
    );

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
    // 비밀번호 일치 확인
    const onChangePasswordConfirm = (e) => {
        const passwordConfirmCurrent = e.target.value;
        setPasswordConfirm(passwordConfirmCurrent);
    };
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

    // 값 가져오기
    const onChangeNickName = (e) => {
        setNickName(e.target.value);
    };
    const handleChange = (e) => {
        setRegion(e.target.value);
    };
    const onAuthNumber = (e) => {
        setAuthNumber(e.target.value);
    };

    // 메일 인증
    const idSend = { address: userId };
    const idCheck = { email: userId };

    const onDoublingHandler = (e) => {
        e.preventDefault();
        if (!isUserId) {
            return setErrorMessage("이메일을 확인해주세요");
        } else {
            apis
                .emailCheck(idCheck)
                .then((response) => {
                    console.log(response);
                    setErrorMessage("인증번호를 입력해주세요");
                    setIsEmail(true);
                    console.log(isEmail);
                    apis
                        .emailSend(idSend)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const buttonsEmail = (
        <>
            {isEmail ? (
                <Button
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    disabled
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onDoublingHandler(e);
                    }}
                >
                    발송 완료
                </Button>
            ) : (
                <Button
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onDoublingHandler(e);
                    }}
                >
                    메일 인증
                </Button>
            )}
        </>
    );
    const certification = {
        email: userId,
        certificationNum: authNumber,
    };
    const onAuthNumberHandler = (e) => {
        e.preventDefault();
        if (authNumber.length === 0) {
            return setErrorMessage("인증번호를 입력해주세요");
        } else {
            apis
                .certification(certification)
                .then((response) => {
                    console.log(response.data.success);
                    if (!response.data.success) {
                        return setErrorMessage("인증번호를 확인해주세요");
                    }
                    setErrorMessage("인증이 완료되었습니다");
                    setIsAuth(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const buttonsAuthNumber = (
        <>
            {isAuth ? (
                <Button
                    disabled
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onAuthNumberHandler(e);
                    }}
                >
                    제출 완료
                </Button>
            ) : (
                <Button
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onAuthNumberHandler(e);
                    }}
                >
                    제출
                </Button>
            )}
        </>
    );

    // 닉네임 중복 확인
    const checkNickname = { nickname: nickName };
    const onDoublingNickHandler = (e) => {
        e.preventDefault();
        if (nickName.length === 0) {
            return setErrorMessage("닉네임을 입력해주세요");
        } else {
            apis
                .nicknameCheck(checkNickname)
                .then((response) => {
                    console.log(response);
                    if (response.data.success) {
                        setIsNickName(true);
                        setErrorMessage("사용 가능한 닉네임입니다");
                    } else {
                        setErrorMessage("이미 사용중인 닉네임입니다");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const buttonsNickname = (
        <>
            {isNickname ? (
                <Button
                    disabled
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onDoublingNickHandler(e);
                    }}
                >
                    중복 확인
                </Button>
            ) : (
                <Button
                    style={{ marginLeft: "4%", fontSize: "x-small" }}
                    variant="outlined"
                    onClick={(e) => {
                        setsnackOpen(true);
                        onDoublingNickHandler(e);
                    }}
                >
                    중복 확인
                </Button>
            )}
        </>
    );

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
            <h2>{!auth ? "로그인" : "회원가입"}</h2>
            <form>
                {!auth ? (
                    <>
                        <p>이메일</p>
                        <Input
                            fullWidth
                            placeholder="이메일을 입력하세요"
                            inputProps={ariaLabel}
                            onChange={onChangeUserId}
                        />
                    </>
                ) : (
                    <>
                        <p>이메일</p>
                        {isEmail ? (
                            <Input
                                disabled
                                defaultValue="Disabled"
                                style={{ width: "68%" }}
                                placeholder="이메일을 입력하세요"
                                inputProps={ariaLabel}
                                onChange={onChangeUserId}
                            />
                        ) : (
                            <Input
                                style={{ width: "68%" }}
                                placeholder="이메일을 입력하세요"
                                inputProps={ariaLabel}
                                onChange={onChangeUserId}
                            />
                        )}
                        {buttonsEmail}
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
                        <br />
                        {isEmail && (
                            <>
                                {isAuth ? (
                                    <Input
                                        disabled
                                        defaultValue="Disabled"
                                        style={{ width: "68%" }}
                                        placeholder="인증번호를 입력하세요"
                                        inputProps={ariaLabel}
                                        onChange={onAuthNumber}
                                    />
                                ) : (
                                    <Input
                                        style={{ width: "68%" }}
                                        placeholder="인증번호를 입력하세요"
                                        inputProps={ariaLabel}
                                        onChange={onAuthNumber}
                                    />
                                )}
                                {buttonsAuthNumber}
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
                            </>
                        )}
                        <br />
                        {auth && userId.length > 1 && isUserId ? (
                            <>
                                {isAuth ? (
                                    <span style={{ color: "green" }}>
                                        이메일 인증이 완료되었습니다
                                    </span>
                                ) : (
                                    <span style={{ color: "green" }}>{userIdMessege}</span>
                                )}
                            </>
                        ) : (
                            <span style={{ color: "red" }}>{userIdMessege}</span>
                        )}
                    </>
                )}

                <p>비밀번호</p>
                <Input
                    fullWidth
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={onChangePassword}
                />
                <br />
                {auth &&
                    (isPassword ? (
                        <span style={{ color: "green" }}>{passwordMessage}</span>
                    ) : (
                        <span style={{ color: "red" }}>{passwordMessage}</span>
                    ))}
                {auth && (
                    <>
                        <p>비밀번호 확인</p>
                        <Input
                            fullWidth
                            type="password"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            onChange={onChangePasswordConfirm}
                        />
                        <br />
                        {passwordConfirm.length > 0 && !isPasswordConfirm ? (
                            <span style={{ color: "red" }}>{passwordConfirmMessage}</span>
                        ) : (
                            <span style={{ color: "green" }}>{passwordConfirmMessage}</span>
                        )}
                    </>
                )}
                <p />
                {auth && (
                    <>
                        <p>닉네임</p>
                        {isNickname ? (
                            <Input
                                disabled
                                defaultValue="Disabled"
                                style={{ width: "68%" }}
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                onChange={onChangeNickName}
                            />
                        ) : (
                            <Input
                                style={{ width: "68%" }}
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                onChange={onChangeNickName}
                            />
                        )}

                        {buttonsNickname}
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

                        <FormControl
                            variant="standard"
                            sx={{ width: "100%", paddingBottom: "10px", marginTop: "10px" }}
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                관심 지역
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={region}
                                onChange={handleChange}
                                label="region"
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="">
                                    <em>---지역 선택---</em>
                                </MenuItem>
                                <MenuItem value="강남구">강남구</MenuItem>
                                <MenuItem value="강동구">강동구</MenuItem>
                                <MenuItem value="강북구">강북구</MenuItem>
                                <MenuItem value="강서구">강서구</MenuItem>
                                <MenuItem value="관악구">관악구</MenuItem>
                                <MenuItem value="광진구">광진구</MenuItem>
                                <MenuItem value="구로구">구로구</MenuItem>
                                <MenuItem value="금천구">금천구</MenuItem>
                                <MenuItem value="노원구">노원구</MenuItem>
                                <MenuItem value="도봉구">도봉구</MenuItem>
                                <MenuItem value="동대문구">동대문구</MenuItem>
                                <MenuItem value="동작구">동작구</MenuItem>
                                <MenuItem value="마포구">마포구</MenuItem>
                                <MenuItem value="서대문구">서대문구</MenuItem>
                                <MenuItem value="서초구">서초구</MenuItem>
                                <MenuItem value="성동구">성동구</MenuItem>
                                <MenuItem value="성북구">성북구</MenuItem>
                                <MenuItem value="송파구">송파구</MenuItem>
                                <MenuItem value="양천구">양천구</MenuItem>
                                <MenuItem value="영등포구">영등포구</MenuItem>
                                <MenuItem value="용산구">용산구</MenuItem>
                                <MenuItem value="은평구">은평구</MenuItem>
                                <MenuItem value="종로구">종로구</MenuItem>
                                <MenuItem value="중구">중구</MenuItem>
                                <MenuItem value="중랑구">중랑구</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                    </>
                )}

                <div>
                    {buttonsTotal}
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
                <Button variant="text" onClick={onChangeHandler}>
                    {auth ? "뒤로" : "회원가입하러"} 가기
                </Button>
            </div>
        </div>
    );
}
