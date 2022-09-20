import { useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
export default function ChatRoomPage() {
  const navigate = useNavigate();
  return (
    <>
      <Wrap>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
`;
