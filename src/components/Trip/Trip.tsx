import React, { FC } from "react";
import {
  ListItem,
  Paper,
  Stack,
  Typography,
  Box,
  List,
  ListItemText,
} from "@mui/material";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import InfoIcon from "@mui/icons-material/Info";
import { useTripsContext } from "../context/TripsContext";

interface Provider {
  [key: string]: any;
}

interface TripProps {
  data: Provider;
}
type TripsContextType = {
  handleLocation: (value: object) => void;
};

const Trip: FC<TripProps> = ({ data }): JSX.Element => {
  console.log("data", data);
  const { handleLocation } = useTripsContext() as TripsContextType;

  const shapeStyles = { bgcolor: "primary.main", width: 30, height: 30 };
  const shapeCircleStyles = { borderRadius: "50%" };
  const bgColor = (time: string) =>
    Number(time) < 10 ? "error.main" : "grey.600";

  const tripDetails = (arr: Array<{}>) => {
    console.log("arr", arr);
    return arr.map((nextBus: Provider) => {
      console.log("nextBus", nextBus);
      return (
        <ListItem
          onClick={() =>
            handleLocation({
              Longitude: nextBus.Longitude,
              Latitude: nextBus.Latitude,
            })
          }
          sx={{
            padding: 0,
            justifyContent: "center",
          }}
          key={nextBus.TripStartTime}
        >
          <Paper
            sx={{
              bgcolor: bgColor(nextBus.AdjustedScheduleTime),
              paddingX: 1,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <ListItemText
              sx={{
                lineHeight: 1,
                color: "white",
              }}
            >
              {nextBus.AdjustedScheduleTime}m
            </ListItemText>
          </Paper>
        </ListItem>
      );
    });
  };

  return (
    <ListItem>
      <Paper variant="outlined">
        <Stack m={2} width="12rem">
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
              <Typography
                variant="body1"
                color="white"
                textAlign="center"
                mt={0.5}
                sx={{ fontWeight: 600 }}
              >
                {data.RouteNo}
              </Typography>
            </Box>
            <Typography variant="body1" ml={1}>
              {data.RouteHeading}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" my={1}>
            <DepartureBoardIcon />
            <Typography variant="body2" my={1} ml={1}>
              Next trip in
            </Typography>
          </Stack>
          {data.Trips && (
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: 0,
              }}
            >
              {Array.isArray(data.Trips.Trip)
                ? tripDetails(data.Trips.Trip)
                : Array.isArray(data.Trips)
                ? tripDetails(data.Trips)
                : data.Trips.Trip
                ? tripDetails([data.Trips.Trip])
                : tripDetails([data.Trips])}
            </List>
          )}
          <Stack direction="row" alignItems="center" my={1} mt={2} mx={1}>
            <InfoIcon sx={{ color: "#6b6575" }} />
            <Typography variant="caption" ml={1}>
              Click on minutes to see current location of a bus
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </ListItem>
  );
};

export default Trip;
