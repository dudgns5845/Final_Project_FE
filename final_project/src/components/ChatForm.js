import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
import { Box } from "@mui/material";
export default function ChatForm({ item }) {
  return (
    <>
      {item.senderId === getCookie("id") ? (
        <Box style={{ textAlign: "right", marginTop: "20px" }}>
          <Box
            component="span"
            style={{
              backgroundColor: "#B9C0EA",
              color: "white",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "5px 10px",
            }}
          >
            {item.message}
          </Box>
        </Box>
      ) : (
        <Box style={{ textAlign: "left", marginTop: "20px" }}>
          <Box
            component="span"
            style={{
              backgroundColor: "#B3DFEC",
              color: "white",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "5px 10px",
            }}
          >
            {item.message}
          </Box>
        </Box>
      )}
    </>
  );
}
