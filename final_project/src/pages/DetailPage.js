import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  Typography,
  CardActions,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Button,
  Hidden,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
// import Header from "../components/Header";
import apis from "../apis/Apis";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Detail() {
  const navigate = useNavigate();
  const param = useParams();

  // 캐로셀 넘버링
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef();

  const [postData, setPostData] = useState([]);
  const [imageList, setImageList] = useState(["/default-image.jpg"]);
  const [isBookMark, setIsBookMark] = useState(false);

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Bookmarking = () => {
    apis
      .addBookMark(param.postid)
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          setIsBookMark(!isBookMark);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    apis
      .postDetail(param.postid)
      .then((response) => {
        console.log(response);
        setPostData(response.data.data);
        setImageList((preList) => [...response.data.data.imageUrl]);
        setIsBookMark(response.data.data.postPicked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param]);
  // console.log(imageList);

  // 게시물 수정
  const PutHandler = () => {};

  // 게시물 삭제

  const DeleteHandler = () => {
    apis
      .deleteDetail(param.postid)
      .then((response) => {
        console.log(response);
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
          alert("게시물이 삭제되었습니다");
          navigate("/");
        } else {
          alert("취소되었습니다");
        }
      })
      .catch((error) => console.log(error));
  };

  // 캐로셀
  const TOTAL_SLIDES = imageList.length - 1;

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const PreveSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // console.log(slideRef.current, "adbr");
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <>
      <div style={ImgContainer}>
        <div style={Slide} ref={slideRef}>
          {imageList.map((images, index) => (
            <img key={index} alt="" style={imgCss} src={images} />
          ))}
        </div>
        <IconButton
          style={IconCss}
          size="large"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftRoundedIcon fontSize="large" />
        </IconButton>
        <ArrowBackIosIcon style={ButtonLeft} onClick={PreveSlide} />
        <ArrowForwardIosIcon style={ButtonRight} onClick={NextSlide} />
      </div>

      <Card sx={{ width: "100vw" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
              src={postData.userImageUrl}
            >
              {postData.userImageUrl}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon
                aria-label="settings"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={PutHandler}>수정</MenuItem>
                <MenuItem onClick={DeleteHandler}>삭제</MenuItem>
              </Menu>
            </IconButton>
          }
          title={postData.nickname}
          subheader={postData.location}
        />
        <CardContent>
          <Typography variant="h5" color="text.main">
            {postData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postData.category}&nbsp;&nbsp;{postData.postDate}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postData.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={Bookmarking}>
            {isBookMark ? <TurnedInNotRoundedIcon /> : <BookmarkIcon />}
          </IconButton>
          <Button
            style={ButtonCss}
            fullWidth
            startIcon={<QuestionAnswerRoundedIcon />}
          >
            1:1 채팅
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
const IconCss = {
  position: "absolute",
  color: "white",
  top: "5px",
};

const ImgContainer = {
  display: "flex",
  width: "100%",
  height: "60vh",
  overflow: "hidden",
  alignItems: "center",
};

const Slide = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
  display: "flex",
};

const ButtonLeft = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#dcdcdc",
  padding: "0 10px",
  left: "5px",
  top: "28%",
};

const imgCss = {
  width: "100%",
  height: "100%",
  backgroundColor: "gray",
  objectFit: "cover",
  display: "flex",
};

const ButtonRight = {
  position: "absolute",
  right: "0",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#dcdcdc",
  padding: "0 10px",
  top: "28%",
};
const ButtonCss = {
  color: "white",
  backgroundColor: "gray",
};
