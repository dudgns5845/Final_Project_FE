import React from "react";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Post({ post }) {
  const navigate = useNavigate();
  return (
    <CardActionArea onClick={() => navigate(`/detail/${post.id}`)}>
      <div style={CardCss}>
        {/* <img style={ImageCss} src='https://picsum.photos/200' /> */}
        <img style={ImageCss} src={post.postImageUrl} />
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
};
const TextCss = {
  paddingLeft: "2em",
  width: "100%",
};
const ImageCss = {
  width: "7em",
  height: "7em",
  borderRadius: "0.5em",
};
