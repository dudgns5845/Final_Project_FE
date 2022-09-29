import { useRef, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate, useLocation } from "react-router-dom";
export default function Footer({ firstBox }) {
  const [value, setValue] = useState(0);
  const home = useRef(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const goHome = () => {
    if (location === "/" && firstBox !== undefined) {
      firstBox.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  };
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
        backgroundColor: "white",
        borderTop: "0.5px solid gainsboro",
      }}
    >
      <BottomNavigationAction
        label="홈"
        icon={<HomeSharpIcon />}
        onClick={goHome}
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
