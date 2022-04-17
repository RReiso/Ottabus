import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { useTrips } from "../context/TripsContext";

const Trips = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider;
    handleTrips: (value: object) => void;
  };

  const { trips, handleTrips } = useTrips() as TripsContextType;
  console.log("trips", trips);
  return (
    <>
      <button
        onClick={() =>
          handleTrips({ GetRouteSummaryForStopResult: { StopNo: "7777" } })
        }
      >
        TT
      </button>
      {trips && (
        <Stack alignItems="center" mt={3}>
          <Typography variant="h6">
            You are at stop {trips.GetRouteSummaryForStopResult.StopNo}
          </Typography>
          <Typography variant="body1">
            {trips.GetRouteSummaryForStopResult.StopDescription}
          </Typography>
          <Typography variant="body2">Upcoming Trips</Typography>
          <List>
            {/* {trips.GetRouteSummaryForStopResult.Routes.Route.map(
              (trip: object) => (
                <TripInfo data={trip} />
              )
            )} */}
          </List>
        </Stack>
      )}
    </>
  );
};

export default Trips;
