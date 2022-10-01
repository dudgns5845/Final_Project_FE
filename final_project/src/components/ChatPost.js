import React from "react";
import { autocompleteClasses, CardActionArea } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PanoramaSharp } from "@mui/icons-material";

export default function ChatPost({ post }) {
  const navigate = useNavigate();
  const param = useParams();

  return (
    <CardActionArea onClick={() => navigate(`/chatdetail/${post.roomId}`)}>
      <div style={CardCss}>
        <div style={{ width: "5rem", height: "3.5rem" }}>
          <img
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "cover",
              borderRadius: "100%",
              border: "1px solid gray",
            }}
            src={post.profileUrl}
            alt=""
          />
        </div>

        <div style={TextCss}>
          <label
            style={{ diaply: "flex", fontWeight: "600", fontSize: "1rem" }}
          >
            {post.nickname}
          </label>
          <label
            style={{
              diaply: "flex",
              marginLeft: "4px",
              fontSize: "0.5rem",
              color: "gray",
            }}
          >
            {post.time}
          </label>
          <label
            style={{
              diaply: "flex",
              marginLeft: "4px",
              fontSize: "0.5rem",
              color: "gray",
            }}
          >
            · {post.location}
          </label>
          <p style={{ marginTop: "0.5rem" }}>{post.lastMessage}</p>
        </div>
        {/* 오른쪽에 이미지 만들기 위해 새로 작성*/}
        <div>
          <div style={{ width: "5rem", height: "3.5rem" }}>
            <img
              style={{
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
                borderRadius: "100%",
                border: "1px solid gray",
                position: "absolute",
                right: "-1rem",
              }}
              src={post.postImage !== null ? post.postImage : "logo.jpg"}
              alt=""
            />
          </div>
        </div>
      </div>
    </CardActionArea>
  );
}

const CardCss = {
  display: "flex",
  width: "100%",
  height: "3rem",
  padding: "1em",
  borderTop: "1px solid #f4f4f4",
  // alignItems: "center",
};
const TextCss = {
  // paddingLeft: "2em",
  width: "100%",
};
const ImageCss = {
  // maxWidth: "100px",
  // maxHeight: "100px",
  // minWidth: "100px",
  // minHeight: "100px",
  width: "100px",
  height: "100px",
  aspectRatio: "auto",
  borderRadius: "5px",
  backgroundColor: "#c3d0d8",
  objectFit: "fill",
};
