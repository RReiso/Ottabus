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

  const { trips, error } = useTripsContext() as TripsContextType;
  return (
    <>
      {error && (
        <Typography variant="body1" textAlign="center">
          No data to display
        </Typography>
      )}
      {!error && trips && (
        <Stack alignItems="center" mt={4}>
          <Typography variant="h6">
            You are at stop {trips.GetRouteSummaryForStopResult.StopNo}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {trips.GetRouteSummaryForStopResult.StopDescription}
          </Typography>
          <Typography variant="body1" mt={1}>
            Upcoming Trips
          </Typography>
          <List>
            <Stack
              flexWrap="wrap"
              justifyContent="center"
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
              {Array.isArray(
                trips.GetRouteSummaryForStopResult.Routes.Route
              ) ? (
                trips.GetRouteSummaryForStopResult.Routes.Route.map(
                  (trip: Provider, idx: number) => (
                    <Trip data={trip} key={idx} />
                  )
                )
              ) : (
                <Trip
                  data={trips.GetRouteSummaryForStopResult.Routes.Route}
                  key={
                    trips.GetRouteSummaryForStopResult.Routes.Route.DirectionID
                  }
                />
              )}
            </Stack>
          </List>
        </Stack>
      )}
    </>
  );
};

export default Trips;
