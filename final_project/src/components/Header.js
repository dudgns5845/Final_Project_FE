import React from "react";
import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export default function Header({ children }) {
  return (
    <AppBar position="static">
      <Toolbar sx={AppCss}>{children}</Toolbar>
    </AppBar>
  );
}
const AppCss = {
  position: "sticky",
  display: "flex",
  top: "0",
  height: "5vh",
  backgroundColor: "white",
  justifyContent: "space-between",
  borderBottom: "0.5px solid gainsboro",
  "*": {},
};
