import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { Box, Stack, Typography } from "@mui/material";

import { useLoadScript } from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { useTripsContext } from "../context/TripsContext";

const BusMap: FC = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
  }

  type TripsContextType = {
    location: Provider | undefined;
    error: string;
    handleLocation: (value: object) => void;
  };

  const { location, handleLocation, error } =
    useTripsContext() as TripsContextType;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY as string,
  });

  const mapContainerStyle = { width: "100%", height: "100%" };
  const locationOttawa = { lat: 45.424721, lng: -75.695 };

  if (loadError)
    return (
      <Typography mt={1} variant="body2" textAlign="center">
        Error loading map
      </Typography>
    );
  if (!isLoaded)
    return (
      <Typography mt={1} variant="body2" textAlign="center">
        Loading map...
      </Typography>
    );

  return (
    <>
      <Stack alignItems="center" my={2}>
        <Box
          sx={{
            width: { xs: "20rem", sm: "30rem" },
            height: { xs: "20rem", sm: "30rem" },
          }}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={locationOttawa}
          ></GoogleMap>
        </Box>
      </Stack>
    </>
  );
};

export default BusMap;
