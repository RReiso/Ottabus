import { Typography } from "@mui/material";
import React from "react";

const Header = (): JSX.Element => {
  return (
    <header>
      <Typography variant="h1">OTTABUS</Typography>
      <Typography variant="body1">
        Find your next trip from any stop in Ottawa!
      </Typography>
    </header>
  );
};

export default Header;
