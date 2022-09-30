import { useState, useEffect } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AlarmCard from "../components/AlarmCard";
import { getCookie } from "../shared/Cookie";
import { Container, Button } from "@mui/material";

export default function AlarmPage() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [alarmList, setAlarmList] = useState([]);
  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(undefined);
  const [userId, setUserId] = useState(getCookie("id"));

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Container>알림</Container>
        <Button>모두 읽음</Button>
      </Header>
      {alarmList.map((alarm, idx) => {
        return <AlarmCard alarm={alarm} key={idx}></AlarmCard>;
      })}
    </>
  );
}
