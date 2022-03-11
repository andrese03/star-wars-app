import React from "react";
import { Typography } from "@mui/material";
import Card from "./Card";

interface Props {
  title: React.ReactNode;
  icon: React.ReactNode;
}

function Header(props: Props) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" component="h1">
        {props.title}
      </Typography>
      {props.icon}
    </Card>
  );
}

export default Header;
