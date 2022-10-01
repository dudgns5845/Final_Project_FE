import React from "react";
import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { IconButton } from "@mui/material";
import apis from "../apis/Apis";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export default function AlarmCard({ alarm }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(alarm.isRead ? false : true);
  const [alarmStyle, setAlarmStyle] = useState({
    backgroundColor: alarm.isRead ? "white" : "orange",
  });

  //읽음 처리 및 채팅방 이동
  const clickNotiftcation = () => {
    apis.readNotification(alarm.notificationId).then((response) => {
      console.log(response);
      setAlarmStyle({ backgroundColor: "white" });
      setOpen(false);
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
        padding: "0 5vw",
      }}
      onClick={() => navigate(`/chatdetail/${alarm.chatRoomId}`)}
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
        <h5>{alarm.content}</h5>
        <p>d</p>
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
};

const TextCss = {
  paddingLeft: "4vw",
  width: "80vw",
};
