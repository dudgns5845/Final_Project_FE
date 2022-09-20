import { useState } from "react";
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

import { VerticalAlignBottom } from "@mui/icons-material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
      <div style={{ padding: '5px' }}>
        <div style={{ marginTop: "18%" }}></div>
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="선택"
            value={search.category}
            onChange={onCategory}
            displayEmpty
          >
            <MenuItem value="">--선택--</MenuItem>
            <MenuItem value="DEVICE">디지털기기</MenuItem>
            <MenuItem value="APPLANCE">생활가전</MenuItem>
            <MenuItem value="KITCHEN">생활/주방</MenuItem>
            <MenuItem value="WOMEN">여성의류/잡화</MenuItem>
            <MenuItem value="MEN">남성의류/잡화</MenuItem>
            <MenuItem value="BEAUTY">뷰티/미용</MenuItem>
            <MenuItem value="GAME">취미/게임</MenuItem>
            <MenuItem value="BOOK">도서</MenuItem>
            <MenuItem value="TICKET">티켓</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={Click}
          style={{ marginLeft: "130px" }}
        >
          검색하기
        </Button>
        <TextField
          fullWidth
          id="outlined-basic"
          placeholder="검색어를 입력해주세요"
          variant="outlined"
          onChange={onSearch}
        // style={{ width: "40%" }}
        />
        {/* <input type="text" onChange={onSearch} /> */}
      </div>


      <div>
        {(searchList[0] === undefined) &&
          <div style={emptyCss}>
            <SearchRoundedIcon sx={{ width: '150px', height: '150px', color: 'gray' }} />
            <p>검색어를 입력해주세요 : )</p>
          </div>
        }
        {searchList.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </div>
    </>
  );
}

const emptyCss = {
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}