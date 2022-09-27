import React from "react";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Post({ post }) {
  const navigate = useNavigate();
  return (
    <CardActionArea onClick={() => navigate(`/detail/${post.id}`)}>
      <div style={CardCss}>
        <div style={{ width: '100px', height: '100px' }}>
          <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} src={post.postImageUrl} />
        </div>

        <div style={TextCss}>
          <h3>
            {post.title} {post.id}
          </h3>
          <p>Post_location * {post.createdAt}</p>
          <p>{post.category}</p>
        </div>
      </div>
    </CardActionArea>
  );
}

const CardCss = {
  display: "flex",
  width: "100%",
  height: "8em",
  padding: "1em",
  borderTop: "1px solid gray",
  display: "flex",
  alignItems: "center",
  // backgroundColor: '#ffe1cf'
};
const TextCss = {
  paddingLeft: "2em",
  width: "100%",
};
const ImageCss = {
  // maxWidth: "100px",
  // maxHeight: "100px",
  // minWidth: "100px",
  // minHeight: "100px",
  width: '100px',
  height: '100px',
  aspectRatio: 'auto',
  borderRadius: '5px',
  backgroundColor: '#c3d0d8',
  objectFit: 'fill',

};
