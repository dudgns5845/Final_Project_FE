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
    const [userId, setUserId] = useState(getCookie('id'));


    useEffect(() => {
        console.log("매번 실행되는지");
        console.log("listening", listening);

        let eventSource = undefined;

        if (!listening) {
            //   eventSource = new EventSource("http://13.125.71.197/subscribe/2", {withCredentials: true}); //구독
            eventSource = new EventSource(`http://13.125.71.197/subscribe/${userId}`); //구독
            msetEventSource(eventSource);
            console.log("eventSource", eventSource);

            eventSource.onopen = (event) => {
                console.log("connection opened");
            };

            eventSource.onmessage = (event) => {
                console.log("result", event.data);

                setAlarmList(prev => [...prev, JSON.parse(event.data)]);
                // console.log("list", alarmList);
                setValue(event.data);
            };

            eventSource.onerror = (event) => {
                console.log(event.target.readyState);
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log("eventsource closed (" + event.target.readyState + ")");
                }
                eventSource.close();
            };

            setListening(true);
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed");
        };
    }, []);

    const checkData = () => {
        console.log(alarmList);
    };

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