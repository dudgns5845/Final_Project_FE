import { useState } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ title: "", category: "" });
  const [searchList, setSearchList] = useState([]);
  const onSearch = (e) => {
    setSearch({ ...search, title: e.target.value });
  };

  const onCategory = (e) => {
    setSearch({ ...search, category: e.target.value });
  };
  console.log(search);
  const Click = () => {
    apis
      .searchList(search)
      .then((response) => {
        setSearchList(response.data.data.content);
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        ></ArrowBackIcon>
      </Header>
      <h1>검색창입니다.</h1>
      <select onChange={onCategory}>
        <option value="">---선택---</option>
        <option value="DEVICE">디지털기기</option>
        <option value="APPLANCE">생활가전</option>
        <option value="KITCHEN">생활/주방</option>
        <option value="WOMEN">여성의류/잡화</option>
        <option value="MEN">남성의류/잡화</option>
        <option value="BEAUTY">뷰티/미용</option>
        <option value="GAME">취미/게임</option>
        <option value="BOOK">도서</option>
        <option value="TICKET">티켓</option>
      </select>

      <input type="text" onChange={onSearch} />
      <button onClick={Click}>검색하기</button>
      <div style={{ marginTop: "5em" }}>
        {searchList.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </div>
    </>
  );
}
