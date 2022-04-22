import { Typography, Box, Stack } from "@mui/material";
import bus from "../../images/bus.png";
import React from "react";

const Header = (): JSX.Element => {
  return (
    <header>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography
          mt={3}
          mx={1}
          variant="h1"
          textAlign="center"
          sx={{ marginRight: { sm: 5 } }}
        >
          OTTABUS
        </Typography>
        <Box my={2} mx={1} width={100} height={100}>
          <img
            src={bus}
            alt="red bus"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Stack>
      <Typography mb={4} variant="h6" textAlign="center" fontWeight="normal">
        Find your next trip from any bus stop in{" "}
        <span style={{ fontWeight: "bold", color: "#1976d2" }}>Ottawa!</span>
      </Typography>
    </header>
  );
};

export default Header;
