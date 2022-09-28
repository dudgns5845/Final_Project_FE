import { useState, useEffect } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlarmCard from "../components/AlarmCard";
import { getCookie } from "../shared/Cookie";
// import useUpdateEffect from "../store/hooks/useUpdateEffect";

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

            setAlarmList(prev=>[...prev, JSON.parse(event.data)]);
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
    }   , []);

  //   useUpdateEffect(() => {
  //     console.log("data: ", data);
  //   }, [data]);

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
            <h4>알림</h4>
        </Header>

        <div style={{ marginTop: "5em" }}>
            {alarmList.map((alarm, idx) => {
            return <AlarmCard alarm={alarm} key={idx}></AlarmCard>;
            })}
        </div>
    </>
    );
}
