import Header from "../components/Header";
import Post from "../components/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../apis/Apis";
function SubMyPage() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    apis
      .getAllPostList(`?searchValue=&category=`)
      .then((response) => {
        console.log(response);
        setPostList(response.data.data.content);
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
        {postList.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </div>
    </>
  );
}
export default SubMyPage;
