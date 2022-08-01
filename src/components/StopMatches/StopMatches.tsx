import { List, ListItemButton, ListItemText } from "@mui/material";
import React, { FC } from "react";
import { useTripsContext } from "../context/TripsContext";

interface TripProps {
  matches: object[];
  stop: string;
  setStop: (value: string) => void;
  setMatches: (value: any) => void;
  setStopName: (value: string) => void;
}

const StopMatches: FC<TripProps> = ({
  matches,
  setMatches,
  stop,
  setStop,
  setStopName,
}): JSX.Element => {
  type TripsContextType = {
    handleTrips: (value: object | undefined) => void;
    handleError: (value: string) => void;
  };

  const { handleTrips, handleError } = useTripsContext() as TripsContextType;

  type StopInfo = {
    [key: string]: any;
  };

  const stopMatches = matches.map((stopInfo: StopInfo) => {
    return (
      <ListItemButton
        key={stopInfo.stop_id}
        selected={stop === stopInfo.info}
        onClick={() => handleClick(stopInfo.info, stopInfo.name)}
      >
        <ListItemText primary={`${stopInfo.name} - ${stopInfo.info}`} />
      </ListItemButton>
    );
  });

  const handleClick = (stopNumber: string, stopName: string) => {
    setStop(stopNumber);
    setStopName(stopName);
    setMatches([]);
    handleError("");
    handleTrips(undefined);
  };

  return (
    <List component="nav" aria-label="secondary mailbox folder">
      {stopMatches}
    </List>
  );
};

export default StopMatches;
