import { GoogleMap, Marker } from "@react-google-maps/api";

import { Box, Stack, Typography } from "@mui/material";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import { useLoadScript } from "@react-google-maps/api";
import React, { FC } from "react";
import { useTripsContext } from "../context/TripsContext";

const BusMap: FC = (): JSX.Element => {
  interface Provider {
    [key: string]: any;
    equals: number;
    lat: number;
    lng: number;
    toJSON: string;
    toUrlValue: string;
  }

  type TripsContextType = {
    location: Provider | undefined;
    error: string;
    handleLocation: (value: object) => void;
  };

  const { location } = useTripsContext() as TripsContextType;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY as string,
  });

  let coordinates;
  let zoom;
  if (location && location.lat !== 0 && location.lng !== 0) {
    coordinates = { ...location };
    zoom = 15;
  } else {
    coordinates = { lat: 45.424721, lng: -75.695 }; // Ottawa
    zoom = 10;
  }

  let message;
  if (location && location.lat === 0 && location.lng === 0) {
    message = "Bus location not available!";
  }

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

  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  return (
    <Stack alignItems="center" mt={2} mb={4} id="map">
      {message && (
        <Stack direction="row">
          <BusAlertIcon style={{ color: "#C71919" }} />
          <Typography mx={1} mb={2} variant="body1">
            {message}
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          width: { xs: "20rem", sm: "30rem" },
          height: { xs: "20rem", sm: "30rem" },
        }}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={zoom}
          center={coordinates}
        >
          {zoom === 15 && (
            <Marker
              position={coordinates}
              onLoad={onLoad}
              icon={{
                url: `/pin.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
                scaledSize: new window.google.maps.Size(70, 70),
              }}
            />
          )}
        </GoogleMap>
      </Box>
    </Stack>
  );
};

export default React.memo(BusMap);
