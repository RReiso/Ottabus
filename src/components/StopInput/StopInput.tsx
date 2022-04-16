import React from "react";
import { Typography, TextField, Stack, Button } from "@mui/material";

const StopInput = (): JSX.Element => {
  return (
    <Stack spacing={2} alignItems="center" component="form">
      <Typography variant="body1"> Enter stop number</Typography>
      <TextField
        id="filled-basic"
        label="Stop number"
        variant="filled"
        required
        type="number"
      />
      <Button variant="contained" sx={{ width: "14rem" }} type="submit">
        Find trips
      </Button>
    </Stack>
  );
};

export default StopInput;
