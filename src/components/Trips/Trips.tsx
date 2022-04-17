import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { useTripsContext } from "../context/TripsContext";
import Trip from "../Trip/Trip";

const Trips = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    trips: Provider | undefined;
    handleTrips: (value: object) => void;
  };

  const { trips, handleTrips } = useTripsContext() as TripsContextType;
  return (
    <>
      <button
        onClick={() =>
          handleTrips({
            GetRouteSummaryForStopResult: {
              StopNo: "7633",
              Error: "",
              StopDescription: "HAWTHORNE / COLONEL BY",
              Routes: {
                Route: [
                  {
                    RouteNo: "5",
                    RouteHeading: "Rideau",
                    DirectionID: 1,
                    Direction: "",
                    Trips: [
                      {
                        Longitude: "-75.67637802124024",
                        Latitude: "45.406397399902346",
                        GPSSpeed: "",
                        TripDestination: "Rideau",
                        TripStartTime: "11:01",
                        AdjustedScheduleTime: "1",
                        AdjustmentAge: "0",
                        LastTripOfSchedule: false,
                        BusType: "",
                      },
                      {
                        Longitude: "-75.67637802124024",
                        Latitude: "45.406397399902346",
                        GPSSpeed: "",
                        TripDestination: "Rideau",
                        TripStartTime: "12:01",
                        AdjustedScheduleTime: "53",
                        AdjustmentAge: "1",
                        LastTripOfSchedule: false,
                        BusType: "",
                      },
                      {
                        Longitude: "",
                        Latitude: "",
                        GPSSpeed: "",
                        TripDestination: "Rideau",
                        TripStartTime: "12:31",
                        AdjustedScheduleTime: "83",
                        AdjustmentAge: "-1",
                        LastTripOfSchedule: false,
                        BusType: "",
                      },
                    ],
                  },
                  {
                    RouteNo: "55",
                    RouteHeading: "Bayshore",
                    DirectionID: 2,
                  },
                  {
                    RouteNo: "56",
                    RouteHeading: "Tunney's Pasture",
                    DirectionID: 3,
                  },
                ],
              },
            },
          })
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
          <Typography variant="body1" mt={1}>
            Upcoming Trips
          </Typography>
          <List>
            {trips.GetRouteSummaryForStopResult.Routes.Route.map(
              (trip: Provider) => (
                <Trip data={trip} key={trip.DirectionID} />
              )
            )}
          </List>
        </Stack>
      )}
    </>
  );
};

export default Trips;
