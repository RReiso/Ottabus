import React, { useState } from "react";
import { Typography, TextField, Stack, Button } from "@mui/material";
import { useTripsContext } from "../context/TripsContext";
import axios from "axios";

const StopInput = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    error: string;
    handleTrips: (value: object) => void;
    handleError: (value: string) => void;
  };

  const { handleTrips, error, handleError } =
    useTripsContext() as TripsContextType;

  const [stop, setStop] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stop.length !== 4) {
      handleError("Invalid stop number!");
    } else {
      const tripData = await fetchData(stop);
      if (tripData) {
        setStop("");
        handleTrips(tripData);
      }
    }
  };

  const fetchData = async (stopNumber: string) => {
    try {
      const res = await axios.get(
        `https://serene-stream-71987.herokuapp.com/https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID=${process.env.REACT_APP_OCTRANSPO_APP_ID}&apiKey=${process.env.REACT_APP_OCTRANSPO_API_KEY}&stopNo=${stopNumber}`
      );
      if (res.data[1] === "<") {
        handleError("Invalid stop number!");
      } else if (res.data.error || res.data === "API method not found") {
        handleError("Error retrieving data");
      } else {
        handleError("");
        return res.data;
      }
    } catch (err) {
      handleError("Data currently not available");
    }
  };

  return (
    <Stack
      mb={1}
      spacing={2}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="body1"> Enter stop number</Typography>
      <TextField
        id="filled-basic"
        label="Stop number"
        variant="filled"
        value={stop}
        onChange={(e) => setStop(e.target.value)}
        required
        type="number"
      />
      <Button variant="contained" sx={{ width: "14rem" }} type="submit">
        Find trips
      </Button>

      {error && (
        <Typography color="red" variant="body2">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default StopInput;
