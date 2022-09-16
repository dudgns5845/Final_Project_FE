import Header from "../components/Header";
import Post from "../components/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../apis/Apis";

export default function SubMyPage() {
  const [changePage, setChangePage] = useState(false);
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
    apis
      .myWritepost()
      .then((response) => {
        console.log(response);
        setPostList(response.data.data.content);
        console.log(response.data.data.content);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [changePage]);
  //   apis
  //     .myBookMarkList()
  //     .then((response) => {
  //       setBookMarkList(response.data.data.content);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

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
      {changePage ? (
        <div style={{ marginTop: "5em" }}>
          {postList.map((post, idx) => {
            return <Post post={post} key={idx}></Post>;
          })}
        </div>
      ) : (
        <div style={{ marginTop: "5em" }}>
          {postList.map((post, idx) => {
            return <Post post={post} key={idx}></Post>;
          })}
        </div>
      )}
    </>
  );
}
