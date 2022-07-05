import { Container } from "@mui/system";
import { Button } from "../styled";
import React from "react";
import "leaflet/dist/leaflet.css";

export const LocationFinder = (props) => {
  const setCurrentLocation = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (p) => {
          console.log("Position is:", [p.coords.latitude, p.coords.longitude]);

          // bu fonksiyona tekrar bak ???
          const onPositionFound = props.onPositionFound;
          if (onPositionFound)
            onPositionFound(p.coords.latitude, p.coords.longitude);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("geolocation not available");
    }
  };

  return (
    <Container>
      📍 <Button onClick={setCurrentLocation}>Find my Location</Button>
    </Container>
  );
};
