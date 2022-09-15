import Header from "../components/Header";
import Post from "../components/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../apis/Apis";

export default function SubMyPage() {
  const navigate = useNavigate();
  const [ttt, setTTT] = useState([]);

  useEffect(() => {
    apis
      .myWritepost()
      .then((response) => {
        console.log(response);
        setTTT(response.data.data);
        console.log(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/mypage");
          }}
        />
      </Header>
      <div style={{ marginTop: "5em" }}>
        {ttt.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </div>
    </>
  );
}
