import React from "react";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { IconButton } from "@mui/material";
import apis from "../apis/Apis";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function AlarmCard({ alarm }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(alarm.isRead? false : true)
    const [alarmStyle,setAlarmStyle] = useState({backgroundColor : (alarm.isRead ? 'white' : 'orange')})
    
    const read = () => {
        apis.readNotification(alarm.notificationId)
        .then((response)=>{
            console.log(response)
            setAlarmStyle({backgroundColor : 'white'});
            setOpen(false)
        })
        
    }


    return (
    <CardActionArea sx={alarmStyle}>
        <div style={CardCss}>
        <div style={{ width: "100px", height: "100px" }}>
            <img
            style={{width: "100px", height: "100px", objectFit: "cover",borderRadius: "10px", }}
            src={alarm.postImage}
            />
        </div>
        <div>
            <h3>{alarm.content}</h3>
        </div>
        <div>
            <div>
                {open && <IconButton
                    onClick={ read } 
                    >
                    <CheckRoundedIcon />
                </IconButton>}
            </div>
            <div>
                <IconButton onClick={() => navigate(`/chatdetail/${alarm.roomId}`)} > 
                    <ArrowForwardIosRoundedIcon/>
                </IconButton>
            </div>
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
