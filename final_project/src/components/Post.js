import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Post({ post, injRef }) {
  const navigate = useNavigate();
  const onerrorImage = (e) => {
    e.target.src = "default-image.jpg";
  };
  return (
    <Box
      sx={{
        Width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={injRef}
      onClick={() => navigate(`/detail/${post.id}`)}
    >
      <div style={CardCss}>
        <div style={{ border: "1px solid black", borderRadius: "5px" }}>
          <img
            style={ImgCss}
            onError={onerrorImage}
            src={post.postImageUrl}
            alt=""
          />
        </div>
        <div style={TextCss}>
          <h5>{post.title}</h5>
          <p style={{ fontSize: "1px", marginTop: "-20px" }}>
            {post.category} &nbsp; {post.createdAt}
          </p>
        </div>
        <img
          style={{
            width: "2rem",
            height: "2rem",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={post.userProfileImageUrl}
          alt=""
        />
      </div>
    </Box>
  );
}

const CardCss = {
  display: "flex",
  width: "90vw",
  height: "2vh",
  padding: "8vh 0 8vh 0",
  alignItems: "center",
  objectFit: "cover",

  borderBottom: "0.5px solid gainsboro",
};
const TextCss = {
  paddingLeft: "5vw",
  paddingBottom: "60px",
  width: "100%",
};
const ImgCss = {
  width: "100px",
  height: "100px",
};
