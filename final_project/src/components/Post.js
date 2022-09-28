import React from "react";
import { CardActionArea, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Post({ post }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: '80vw' }}>
      <Box onClick={() => navigate(`/detail/${post.id}`)}>
        <div style={CardCss}>
          <div style={{ width: '100px', height: '100px' }}>
            <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} src={post.postImageUrl} />
          </div>

          <div style={TextCss}>
            <h3>
              {post.title}
            </h3>
            <p>{post.category} &nbsp; {post.createdAt}</p>
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
  display: "flex",
  alignItems: "center",
  // backgroundColor: '#ffe1cf'
};
const TextCss = {
  paddingLeft: "1em",
  width: "100%",
};
const ImageCss = {
  width: '100px',
  height: '100px',
  aspectRatio: 'auto',
  borderRadius: '5px',
  backgroundColor: '#c3d0d8',
  objectFit: 'fill',

};
