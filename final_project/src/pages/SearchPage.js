import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import styled from "styled-components";

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [postList, setPostList] = useState([]);
  const onSearch = (e) => {
    setSearch(e.target.value);
  };
  const Click = () => {
    const test = { title: "테스트", category: "MEN" };
    apis
      .searchList(test)
      .then((response) => {
        setPostList(response.data.data.content);
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
      <select>
        <Option value="null">-----</Option>
        <Option value="DEVICE">디지털기기</Option>
        <Option value="APPLANCE">생활가전</Option>
        <Option value="KITCHEN">생활/주방</Option>
        <Option value="WOMEN">여성의류/잡화</Option>
        <Option value="MEN">남성의류/잡화</Option>
        <Option value="BEAUTY">뷰티/미용</Option>
        <Option value="GAME">취미/게임</Option>
        <Option value="BOOK">도서</Option>
        <Option value="TICKET">티켓</Option>
      </select>

      <input type="text" onChange={onSearch} />
      <button onClick={Click}>검색하기</button>
      <div style={{ marginTop: "5em" }}>
        {postList.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </div>
    </>
  );
}
const Option = styled.option`
width:100px;

}
`;
