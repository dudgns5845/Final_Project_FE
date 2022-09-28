import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Post({ post }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: "80vw" }}>
      <Box onClick={() => navigate(`/detail/${post.id}`)}>
        <div style={CardCss}>
          <div style={{ width: "100px", height: "100px" }}>
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              src={post.postImageUrl}
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
    </Box>
  );
}

const CardCss = {
  display: "flex",
  width: "100%",
  height: "8rem",
  padding: "1em",
  alignItems: "center",
  borderTop: "0.5px solid gainsboro",
  borderBottom: "0.5px solid gainsboro",

  // backgroundColor: '#ffe1cf'
};
const TextCss = {
  paddingLeft: "1em",
  width: "100%",
};
const ImageCss = {
  width: "100px",
  height: "100px",
  aspectRatio: "auto",
  borderRadius: "5px",
  backgroundColor: "#c3d0d8",
  objectFit: "fill",
};
