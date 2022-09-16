import Header from "../components/Header";
import Post from "../components/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apis from "../apis/Apis";

export default function SubMyPage() {
  const params = useParams();
  const [changePage, setChangePage] = useState(
    params.id === ":mywrite" ? true : false
  );
  console.log(params);
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
    {
      changePage
        ? apis
            .myWritepost()
            .then((response) => {
              setPostList(response.data.data.content);
              console.log(response.data.data.content);
            })
            .catch((error) => {
              console.log(error);
            })
        : apis
            .myBookMarkList()
            .then((response) => {
              setBookMarkList(response.data.data);
              console.log(response.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    }
  }, [setChangePage]);

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
          {bookMarkList.map((post, idx) => {
            return <Post post={post} key={idx}></Post>;
          })}
        </div>
      )}
    </>
  );
}
