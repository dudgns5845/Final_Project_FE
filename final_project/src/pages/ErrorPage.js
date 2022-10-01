import React from "react";
import ScreenSize from "../shared/ScreenSize";
import { Box } from "@mui/system";
export default function ErrorPage() {
  return (
    <ScreenSize>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "70px" }}>404</p>
        <h1>Not Found</h1>
      </Box>
    </ScreenSize>
  );
}
