import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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
        <div style={{ border: "0.5px solid gainsboro", borderRadius: "5px" }}>
          <img
            style={ImgCss}
            onError={onerrorImage}
            src={post.postImageUrl}
            alt=""
          />
        </div>
        <div style={TextCss}>
          <h4
            style={{
              position: "relative",
              display: "block",
              width: "100%",
              overflow: "hidden",
              // whiteSpace 왜 적용 안되요? element에서 직접 적용하면 줄바꿈 안되게 잘 되는데...
              whiteSpace: "nowarp",
              textOverflow: "ellipsis",
            }}
          >
            {post.title}
          </h4>
          <p style={{ fontSize: "1px" }}>
            {post.category} &nbsp; {post.createdAt}
          </p>
          <div style={{ display: "flex", gap: "4px" }}>
            <Box
              sx={{
                display: "flex",
                fontSize: "1px",
                alignItems: "center",
              }}
            >
              <BookmarkIcon sx={{ fontSize: "small" }} />
              {post.postPickCount}
            </Box>
            <Box
              sx={{ display: "flex", fontSize: "1px", alignItems: "center" }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: "small" }} />
              {post.postVisitCount}
            </Box>
          </div>
        </div>
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
  width: "100%",
  display: "block",
};
const ImgCss = {
  width: "5rem",
  height: "5rem",
};
