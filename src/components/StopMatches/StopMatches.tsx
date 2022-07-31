import { List, ListItemButton, ListItemText } from "@mui/material";
import React, { FC } from "react";

interface TripProps {
  matches: object[];
  stop: string;
  setStop: Function;
  setMatches: Function;
}

const StopMatches: FC<TripProps> = ({
  matches,
  setMatches,
  stop,
  setStop,
}): JSX.Element => {
  type StopInfo = {
    [key: string]: any;
  };

  const stopMatches = matches.map((stopInfo: StopInfo) => {
    return (
      <ListItemButton
        key={stopInfo.stop_id}
        selected={stop === stopInfo.info}
        onClick={() => handleClick(stopInfo.info)}
      >
        <ListItemText primary={`${stopInfo.name} - ${stopInfo.info}`} />
      </ListItemButton>
    );
  });

  const handleClick = (stopNumber: string) => {
    setStop(stopNumber);
    setMatches([]);
  };

  return (
    <List component="nav" aria-label="secondary mailbox folder">
      {stopMatches}
    </List>
  );
};

export default StopMatches;
