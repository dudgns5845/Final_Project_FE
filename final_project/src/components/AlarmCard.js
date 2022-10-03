import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import apis from "../apis/Apis";

export default function AlarmCard({ alarm }) {
  const navigate = useNavigate();

  //읽음 처리 및 채팅방 이동
  const clickNotiftcation = () => {
    apis.readNotification(alarm.notificationId).then((response) => {
      console.log(response);
      navigate(`/chatdetail/${alarm.chatRoomId}`);
    });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "10vh",
        display: "flex",
        alignItems: "center",
        border: "0.5px solid gainsboro",
        borderRadius: "10px",
        backgroundColor: alarm.isRead ? "white" : "#BCBCBC",
      }}
      onClick={clickNotiftcation}
    >
      <div style={CardCss}>
        <img
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "10px",
          }}
          src={alarm.postImage}
          alt=""
        />
      </div>
      <div style={TextCss}>
        <p>{alarm.content}</p>
      </div>
    </Box>
  );
}

const CardCss = {
  display: "flex",
  borderTop: "0.5px solid gainsboro",
  borderRadius: "5px",
  objectFit: "cover",
  width: "3.5rem",
  height: "3.5rem",
  marginLeft: "10vw",
};

const TextCss = {
  paddingLeft: "4vw",
  fontWeight: "bold",
  width: "80vw",
};
