import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

export default function PostPage() {
  const navigate = useNavigate();
  const [imgState, setImgState] = useState([]);
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [open, setOpen] = useState(false);
  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const imgUploadList = [...imgState];
    for (let i = 0; i < imgSelectList.length; i++) {
      const imgUrl = URL.createObjectURL(imgSelectList[i]);
      imgUploadList.push(imgUrl);
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
        {imgState.map((image) => (
          <img
            src={image}
            alt={image}
            style={{ width: "60px", height: "60px" }}
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
        카테고리
      </div>
      <div style={{ border: "1px solid black", height: "150px" }}>
        <input
          type="text"
          onChange={ContentChange}
          value={contentState}
          placeholder="내용을 입력해주세요."
        />
      </div>
      <Modal
        visible={open}
        closeModal={() => {
          setOpen(false);
        }}
      >
        <div>디지털기기</div>
        <div>생활가전</div>
        <div>생활/주방</div>
        <div>여성의류/잡화</div>
        <div>남성의류/잡화</div>
        <div>뷰티/미용</div>
        <div>취미/게임</div>
        <div>도서</div>
        <div>티켓</div>
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          돌아가기
        </button>
      </Modal>
    </>
  );
}
