import React, { useState, FC } from "react";
import { Typography, TextField, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTripsContext } from "../context/TripsContext";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import axios from "axios";

const StopInput: FC = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    error: string;
    handleTrips: (value: object) => void;
    handleError: (value: string) => void;
    handleLocation: (value: object | undefined) => void;
  };

  const { handleTrips, handleLocation, error, handleError } =
    useTripsContext() as TripsContextType;

  const [stop, setStop] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (stop.length !== 4) {
      handleError("Please enter a four digit number");
    } else {
      const tripData = await fetchData(stop);
      if (tripData) {
        setStop("");
        handleTrips(tripData);
      }
    }
    setLoading(false);
    handleLocation(undefined);
  };

  const fetchData = async (stopNumber: string) => {
    try {
      const res = await axios.get(
        `https://serene-stream-71987.herokuapp.com/https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?appID=${process.env.REACT_APP_OCTRANSPO_APP_ID}&apiKey=${process.env.REACT_APP_OCTRANSPO_API_KEY}&stopNo=${stopNumber}`
      );
      if (res.data[1] === "<") {
        handleError("Sorry, a stop with the given number does not exist");
      } else if (res.data.error || res.data === "API method not found") {
        handleError("Error retrieving data");
      } else {
        handleError("");
        return res.data;
      }
    } catch (err) {
      handleError("Data currently not available. Try again later!");
    }
    setLoading(false);
  };

  return (
    <Stack
      mb={1}
      spacing={2}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="body1" textAlign="center">
        Try out the app with some sample stop numbers:
        <span onClick={() => setStop("7633")} className="sampleStop">
          {" "}
          7633,
        </span>
        <span onClick={() => setStop("7687")} className="sampleStop">
          {" "}
          7687,
        </span>
        <span onClick={() => setStop("8852")} className="sampleStop">
          {" "}
          8852,
        </span>
        <span onClick={() => setStop("1111")} className="sampleStop">
          {" "}
          1111
        </span>
        !
      </Typography>
      <Typography variant="body1"> Enter stop number</Typography>
      <Stack>
        <TextField
          id="filled-basic"
          label="Stop number"
          variant="filled"
          value={stop}
          onChange={(e) => setStop(e.target.value)}
          required
          type="number"
        />
        <Typography
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}
          onClick={() => setStop("7633")}
          my={1}
          variant="caption"
          alignSelf="start"
        >
          Example:
          <span> 7633</span>
        </Typography>
      </Stack>
      <LoadingButton
        variant="contained"
        loading={loading}
        sx={{ width: "14rem" }}
        type="submit"
        loadingPosition="start"
        startIcon={<DirectionsBusIcon />}
      >
        {loading ? "Searching..." : "Find trips"}
      </LoadingButton>
      {error && (
        <Typography color="#c71919" variant="body2">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default StopInput;
