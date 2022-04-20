import React from "react";
import { List, Stack, Typography } from "@mui/material";
import { useTripsContext } from "../context/TripsContext";
import Trip from "../Trip/Trip";

const Trips = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    error: string;
    handleTrips: (value: object) => void;
  };

  const { trips, handleTrips, error } = useTripsContext() as TripsContextType;
  return (
    <>
      {error && (
        <Typography variant="body1" textAlign="center">
          No data to display
        </Typography>
      )}
      {!error && trips && (
        <Stack alignItems="center" mt={3}>
          <Typography variant="h6">
            You are at stop {trips.GetRouteSummaryForStopResult.StopNo}
          </Typography>
          <Typography variant="body1">
            {trips.GetRouteSummaryForStopResult.StopDescription}
          </Typography>
          <Typography variant="body1" mt={1}>
            Upcoming Trips
          </Typography>
          <List>
            {Array.isArray(trips.GetRouteSummaryForStopResult.Routes.Route) ? (
              trips.GetRouteSummaryForStopResult.Routes.Route.map(
                (trip: Provider) => <Trip data={trip} key={trip.DirectionID} />
              )
            ) : (
              <Trip
                data={trips.GetRouteSummaryForStopResult.Routes.Route}
                key={
                  trips.GetRouteSummaryForStopResult.Routes.Route.DirectionID
                }
              />
            )}
          </List>
        </Stack>
      )}
    </>
  );
};

export default Trips;
