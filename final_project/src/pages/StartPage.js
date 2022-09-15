import { Container } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";

export default function Start() {
  const navigate = useNavigate();

  const images = useRef([
    {
      src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    },
    {
      src: "https://w.ryanyang.kr/images/d/d9/%EC%9C%A0%ED%98%B9%ED%95%98%EB%8A%94_%EB%9D%BC%EC%9D%B4%EC%96%B8.png",
    },
    {
      src: "https://www.nicepng.com/png/full/317-3179513_21-.png",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  const cookie = getCookie("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookie === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cookie]);
  console.log(isLoggedIn);

  return (
    <Container
      style={{
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "80vh",
        marginTop: "30vw",
        // userSelect: "none",
      }}
    >
      <div style={{ transition: "all 0.3s ease-out" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="slide"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <BtnLeft
              className="btn"
              onClick={() => {
                moveSlide(-1);
              }}
            >
              &lt;
            </BtnLeft>
            <div
              className="window"
              style={{
                // background: "coral",
                width: "90vw",
                height: "50vh",

                overflow: "hidden",
              }}
            >
              <div className="flexbox" style={style}>
                {images.current.map((img, i) => (
                  <div
                    key={i}
                    className="img"
                    style={{
                      backgroundImage: `url(${img.src})`,
                      width: "90vw",
                      height: "50vh",
                      backgroundPosition: "50% 50%",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      flex: "none",
                      float: "left",
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <BtnRight
              className="btn"
              onClick={() => {
                moveSlide(1);
              }}
            >
              &gt;
            </BtnRight>
          </div>
          <div
            className="position"
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {images.current.map((x, i) => (
              <Dot key={i} className={i === current ? "current" : "dots"} />
            ))}
          </div>
        </div>
      </div>
      <br />
      <p />
      <div style={{ display: "grid" }}>
        <Button
          variant="contained"
          style={{ marginTop: "5vw", height: "9vh", fontSize: "x-large" }}
          onClick={() => {
            isLoggedIn ? navigate("/") : navigate("/login");
          }}
        >
          시작하기
        </Button>
      </div>
    </Container>
  );
}

const BtnLeft = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: #dcdcdc;
  padding: 0 10px;
`;

const BtnRight = styled.div`
  position: absolute;
  right: 7.5%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: #dcdcdc;
  padding: 0 10px;
`;

const Dot = styled.div`
  &.current {
    background: gray;
    border-radius: 100%;
    height: 10px;
    width: 10px;
    margin-left: 20px;
  }
  &.dots {
    background: lightgray;
    border-radius: 100%;
    height: 10px;
    width: 10px;
    margin-left: 20px;
  }
`;
