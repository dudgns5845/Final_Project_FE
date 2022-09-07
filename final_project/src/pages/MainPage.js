import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { IconButton } from "@mui/material";

import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import { useNavigate } from "react-router-dom";


const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export default function MainPage() {

  const navigate = useNavigate();

  return (
    <>
      <Header >
        < div style={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnRoundedIcon />
          <span>영등포구</span>
        </div >
        <div>
          <IconButton onClick={() => { navigate('/searchpage') }}>
            <SearchRoundedIcon />
          </IconButton>
          <IconButton onClick={() => { navigate('/postpage') }}>
            <CreateRoundedIcon />
          </IconButton>
          <IconButton>
            <NotificationsRoundedIcon />
          </IconButton>
        </div>
      </Header>

      <div style={{ marginTop: "5em" }}>
        {test.map((postid, idx) => {
          return <Post postid={postid} key={idx}></Post>;
        })}
      </div>
      <IconButton
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={IconCss}
      >
        <ArrowUpwardRoundedIcon style={ArrowCss} />
      </IconButton>
      <Footer />
    </>
  );
}

const IconCss = {
  position: "fixed",
  width: "2.5em",
  height: "2.5em",
  bottom: "120px",
  right: "30px",
  backgroundColor: "skyblue",
};

const ArrowCss = {
  color: "white",
  width: "1.3em",
  height: "1.3em",
};
