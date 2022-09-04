import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import styled from "styled-components";

export default function PostPage() {
  const navigate = useNavigate();
  const [imgState, setImgState] = useState([]);
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [open, setOpen] = useState(false);
  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const imgUploadList = [...imgState];
    for (let i = 0; i < imgSelectList.length; i++) {
      const imgUrl = URL.createObjectURL(imgSelectList[i]);
      imgUploadList.push(imgUrl);
      if (imgUploadList.length > 5) {
        imgUploadList = imgUploadList.slice(0, 5);
      }
    }
    setImgState(imgUploadList);
  };
  const TitleChange = (e) => {
    const titleState = e.target.value;
    setTitleState(titleState);
    console.log(titleState);
  };
  const ContentChange = (e) => {
    const contentState = e.target.value;
    setContentState(contentState);
    console.log(contentState);
  };
  const OpenModal = () => {
    setOpen(true);
  };
  const CloseModal = () => {
    setOpen(false);
  };
  const onChangeHandler = (e) => {
    const category = e.target.innerText;
    setCategory(category);
    console.log(category);
    CloseModal();
  };
  const ClickHandler = () => {
    console.log(titleState, contentState, imgState, category);
  };
  const handleDeleteImage = (id) => {
    setImgState(imgState.filter((_, index) => index !== id));
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <button
              style={{ fontSize: "10px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              되돌아가기
            </button>
            <h4>게시글쓰기</h4>
            <button onClick={ClickHandler}>완료</button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ border: "1px solid black", height: "100px" }}>
        <label onChange={AddImage}>
          여기
          <input
            type="file"
            multiple
            accept="image/*"
            encType="multipart/form-data"
            hidden
          />
        </label>
        {imgState.map((image, id) => (
          <img
            key={id}
            src={image}
            alt={`${image}-${id}`}
            style={{ width: "60px", height: "60px" }}
            onClick={() => handleDeleteImage(id)}
          />
        ))}
      </div>
      <div style={{ border: "1px solid black", height: "70px" }}>
        <input
          type="text"
          onChange={TitleChange}
          value={titleState}
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div
        style={{
          border: "1px solid black",
          height: "40px",
          textAlign: "center",
        }}
        onClick={OpenModal}
      >
        <p>{category}</p>
      </div>
      <div style={{ border: "1px solid black", height: "150px" }}>
        <input
          type="text"
          onChange={ContentChange}
          value={contentState}
          placeholder="내용을 입력해주세요."
        />
      </div>
      <Modal visible={open} closeModal={CloseModal}>
        <Div data-value="1" onClick={onChangeHandler}>
          디지털기기
        </Div>
        <Div data-value="2" onClick={onChangeHandler}>
          생활가전
        </Div>
        <Div data-value="3" onClick={onChangeHandler}>
          생활/주방
        </Div>
        <Div data-value="4" onClick={onChangeHandler}>
          여성의류/잡화
        </Div>
        <Div data-value="5" onClick={onChangeHandler}>
          남성의류/잡화
        </Div>
        <Div data-value="6" onClick={onChangeHandler}>
          뷰티/미용
        </Div>
        <Div data-value="7" onClick={onChangeHandler}>
          취미/게임
        </Div>
        <Div data-value="8" onClick={onChangeHandler}>
          도서
        </Div>
        <Div data-value="9" onClick={onChangeHandler}>
          티켓
        </Div>
        <button onClick={CloseModal}>돌아가기</button>
      </Modal>
    </>
  );
}
const Div = styled.div`
  align-items: center;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: 9e90e6;
  }
`;
