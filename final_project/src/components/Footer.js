import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Navigate, useNavigate } from "react-router-dom";
export default function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "10vh",
        backgroundColor: "silver",
      }}
    >
      <BottomNavigationAction
        label="홈"
        icon={<HomeRoundedIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="채팅"
        icon={<QuestionAnswerRoundedIcon />}
        onClick={() => navigate("/mychat")}
      />
      <BottomNavigationAction
        label="마이페이지"
        icon={<PersonRoundedIcon />}
        onClick={() => navigate("/mypage")}
      />
    </BottomNavigation>
  );
}
