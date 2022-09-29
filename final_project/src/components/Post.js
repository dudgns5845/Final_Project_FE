import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Post({ post, injRef }) {
  const navigate = useNavigate();
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
        <div style={{ width: "100px", height: "100px" }}>
          <img
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
              marginLeft: "10px",
            }}
            src={post.postImageUrl}
            alt="null"
          />
        </div>

        <div style={TextCss}>
          <h5>{post.title}</h5>
          <h6>
            {post.category} &nbsp; {post.createdAt}
          </h6>
        </div>
      </div>
    </Box>
  );
}

const CardCss = {
  display: "flex",
  width: "100%",
  height: "3vh",
  padding: "8vh 0",
  alignItems: "center",
  borderTop: "0.5px solid gainsboro",
};
const TextCss = {
  paddingLeft: "8vw",
  width: "100%",
};
