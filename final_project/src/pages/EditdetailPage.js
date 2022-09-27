import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import styled from "styled-components";
import apis from "../apis/Apis";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditDetailPage() {
  const navigate = useNavigate();
  const param = useParams();
  const [postData, setPostData] = useState({
    data: new FormData(),
    postid: "",
  });
  const [imgState, setImgState] = useState([]);
  const [imgFile, setImgFile] = useState();
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [category, setCategory] = useState("카테고리 선택");
  const [tmpcategory, setTmpCategory] = useState(category);
  const [open, setOpen] = useState(false);

  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const imgUploadList = [...imgState];

    console.log(new Array(...imgSelectList));

    for (let i = 0; i < imgSelectList.length; i++) {
      //전송을 위한 이미지 데이터 추가
      setImgFile(new Array(...imgSelectList));

      const imgUrl = URL.createObjectURL(imgSelectList[i]);
      imgUploadList.push(imgUrl);
      if (imgUploadList.length > 5) {
        imgUploadList = imgUploadList.slice(0, 5);
      }
    }
    setImgState(imgUploadList);
  };

  // 게시물에 있던 내용 입력
  // console.log(param.postid);
  useEffect(() => {
    apis
      .postDetail(param.postid)
      .then((response) => {
        console.log(response);
        setTitleState(response.data.data.title);

        setTmpCategory(response.data.data.category);

        if (response.data.data.category === "DEVICE") {
          setCategory("디지털기기");
        } else if (response.data.data.category === "APPLIANCE") {
          setCategory("생활가전");
        } else if (response.data.data.category === "KITCHEN") {
          setCategory("생활/주방");
        } else if (response.data.data.category === "WOMEN") {
          setCategory("여성의류/잡화");
        } else if (response.data.data.category === "MEN") {
          setCategory("남성의류/잡화");
        } else if (response.data.data.category === "BEAUTY") {
          setCategory("뷰티/미용");
        } else if (response.data.data.category === "GAME") {
          setCategory("취미/게임");
        } else if (response.data.data.category === "BOOK") {
          setCategory("도서");
        } else if (response.data.data.category === "TICKET") {
          setCategory("티켓");
        }

        setContentState(response.data.data.content);

        const imageArray = [response.data.data.imageUrl].map((i) => i);
        console.log(imageArray.length);
        setImgState(imageArray[0]);
        setImgFile(imageArray[0]);
        setPostData({ ...postData, postid: param.postid });
        console.log(postData);
      })
      .catch((error) => console.log(error));
  }, []);

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
    if (category === "디지털기기") {
      setTmpCategory("DEVICE");
    } else if (category === "생활가전") {
      setTmpCategory("APPLIANCE");
    } else if (category === "생활/주방") {
      setTmpCategory("KITCHEN");
    } else if (category === "여성의류/잡화") {
      setTmpCategory("WOMEN");
    } else if (category === "남성의류/잡화") {
      setTmpCategory("MEN");
    } else if (category === "뷰티/미용") {
      setTmpCategory("BEAUTY");
    } else if (category === "취미/게임") {
      setTmpCategory("GAME");
    } else if (category === "도서") {
      setTmpCategory("BOOK");
    } else if (category === "티켓") {
      setTmpCategory("TICKET");
    }
    setCategory(category);
    CloseModal();
  };

  const ClickHandler = () => {
    // console.log(titleState, contentState, imgFile, category);

    // setPostData({ ...postData, data:  });

    const dto = {
      title: titleState,
      content: contentState,
      category: tmpcategory,
    };

    console.log(dto.category);

    postData.data.append(
      "requestDto",
      new Blob([JSON.stringify(dto)], {
        type: "application/json",
      })
    );
    console.log(imgFile);
    for (let img of imgFile) {
      postData.data.append("imageFileList", img);
    }

    // console.log(postData.data["requestDto"]);
    // for (let value of postData.data.keys()) {
    //   console.log(value);
    // }
    // for (let value of postData.data.values()) {
    //   console.log(value);
    // }

    //통신
    apis
      .editDetail(postData)
      .then((response) => {
        console.log(response);
        // navigate(`/detail/${param.postid}`);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  //업로드 사진 삭제 기능
  const handleDeleteImage = (id) => {
    setImgState(imgState.filter((_, index) => index !== id));
    setImgFile(imgFile.filter((_, index) => index !== id));
  };
  return (
    <>
      <Modal visible={open} closeModal={CloseModal}>
        <div style={{ marginTop: "40px" }}>
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
          <Button style={{ marginTop: "20px" }} onClick={CloseModal}>
            돌아가기
          </Button>
        </div>
      </Modal>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <h4>수정하기</h4>
        <Button
          style={{
            fontSize: "10px",
            backgroundColor: "#FFBA46",
            marginRight: "20PX",
            borderRadius: "5px",
          }}
          variant="contained"
          component="label"
          onClick={ClickHandler}
        >
          Upload
        </Button>
      </Header>
      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            border: "1px solid gainsboro",
            height: "100px",
            borderRight: "0px",
            borderLeft: "0px",
            display: "fixed",
            alignItems: "center",
          }}
        >
          <label onChange={AddImage}>
            <AddAPhotoIcon
              style={{ fontSize: "40px", margin: "30px", marginLeft: "15px" }}
            />
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
              style={{ width: "55px", height: "70px" }}
              onClick={() => handleDeleteImage(id)}
            />
          ))}
        </div>
        <div>
          <InputSt
            type="text"
            fullWidth
            label="글 제목"
            id="title"
            onChange={TitleChange}
            value={titleState}
            placeholder="글 제목을 입력해주세요."
          />
        </div>
        <div
          style={{
            border: "1px solid gainsboro",
            height: "50px",
            textIndent: "10px",
            borderTop: "0px",
            borderRight: "0px",
            borderLeft: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "5PX",
          }}
          onClick={OpenModal}
        >
          <Service>{category}</Service>

          <ArrowForwardIosIcon style={{ fontSize: "15px" }} />
        </div>
        <ContentStyle
          multiline
          label="내용"
          rows={18}
          placeholder="내용을 입력해주세요."
          onChange={ContentChange}
          value={contentState}
          required
        />
      </div>
    </>
  );
}

const Div = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  height: 40px;
  &:hover {
    text-decoration: underline;
    border: 0.5px solid gainboro;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const InputSt = styled.input`
  border: 1px solid gainsboro;
  border-right: 0px;
  border-left: 0px;
  width: 100%;
  height: 60px;
  text-indent: 8px;
  &:focus {
    outline: 1px solid gray;
  }
`;
const Service = styled.div`
  margin-block-start: 0px;
  margin-block-end: 0px;
  font-size: 14px;
  text-indent: 10px;
  font-weight: bold;
  text-indent: "10px";
`;

const ContentStyle = styled.textarea`
  border: 1px solid gainsboro;
  border-right: 0px;
  border-left: 0px;
  width: 100%;
  text-indent: 8px;
  font-size: 14px;
  padding-top: 18px;
  &:focus {
    outline: 1px solid gray;
  }
`;
