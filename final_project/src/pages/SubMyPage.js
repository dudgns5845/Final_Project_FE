import Header from "../components/Header";
import Post from "../components/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apis from "../apis/Apis";

export default function SubMyPage() {
  const params = useParams();
  const [changePage, setChangePage] = useState(
    params.id === ":mywrite" ? "mywrite" : "mybookmark"
  );

  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
    if (changePage === "mywrite") {
      apis
        .myWritepost()
        .then((response) => {
          setPostList(response.data.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (changePage === "mybookmark") {
      apis
        .myBookMarkList()
        .then((response) => {
          setBookMarkList(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      {changePage === "mywrite" && (
        <div style={{ marginTop: "5em" }}>
          {postList.map((post, idx) => {
            return <Post post={post} key={idx}></Post>;
          })}
        </div>
      )}
      {changePage === "mybookmark" && (
        <div style={{ marginTop: "5em" }}>
          {bookMarkList.map((post, idx) => {
            return <Post post={post} key={idx}></Post>;
          })}
        </div>
      )}
    </>
  );
}
