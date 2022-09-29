import React from "react";
import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { IconButton } from "@mui/material";
import apis from "../apis/Apis";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function AlarmCard({ alarm }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(alarm.isRead ? false : true)
    const [alarmStyle, setAlarmStyle] = useState({ backgroundColor: (alarm.isRead ? 'white' : 'orange') })

    //읽음 처리 및 채팅방 이동
    const clickNotiftcation = () => {
        apis.readNotification(alarm.notificationId)
            .then((response) => {
                console.log(response)
                setAlarmStyle({ backgroundColor: 'white' });
                setOpen(false)
            })

    }

    return (
        <Box sx={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => navigate(`/detail/${alarm.chatid}`)}>
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
                        src={alarm.postImageUrl}
                        alt="null"
                    />
                </div>

                <div style={TextCss}>
                    <h5>{alarm.title}</h5>
                    <h6>

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
