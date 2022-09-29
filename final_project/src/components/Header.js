import React from "react";
import { Toolbar } from "@mui/material";

export default function Header({ children }) {
  return <Toolbar sx={AppCss}>{children}</Toolbar>;
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
