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
  const slideRef = useRef(null);

  const [postData, setPostData] = useState([]);
  const [imageList, setImageList] = useState(["/default-image.jpg"]);
  const [isBookMark, setIsBookMark] = useState(false);
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
  console.log(imageList);

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

  return (
    <>
      <div style={ImgContainer}>
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

        {imageList.map((images, index) => (
          <img
            key={index}
            alt=""
            style={imgCss}
            src={images}
            onClick={() => {
              alert("클릭!");
            }}
          />
        ))}
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
            <IconButton aria-label="settings">
              <MoreVertIcon />
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
};
const ImgContainer = {
  width: "100vw",
  height: "60vh",
  overflow: "hidden",
};
const ButtonLeft = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#dcdcdc",
  padding: "0 10px",
};

const imgCss = {
  width: "100%",
  height: "100%",
  backgroundColor: "gray",
  objectFit: "cover",
  display: "felx",
};

const ButtonRight = {
  position: "absolute",
  right: " 7.5%",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#dcdcdc",
  padding: "0 10px",
};
const ButtonCss = {
  color: "white",
  backgroundColor: "gray",
};
const postData = {
  nickname: "영등포꿀쟁이",
  location: "영등포구",
  postDate: "2022.08.13",
  postTitle: "IT 전공 서적 교환하실 분~!!",
  category: "서적",
  content:
    "IT 전공서적 교환하실 분 구합니다.\n기프티콘과 거래했으면 좋겠습니다.\n대면으로 거래 희망합니다.\n장소는 숭실대입구역에서 진행합니다.\n희망 시 채팅주시길 바랍니다.😆",
};
