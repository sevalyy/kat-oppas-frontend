import { Container } from "@mui/system";
import React from "react";
import "leaflet/dist/leaflet.css";
import { border } from "@cloudinary/url-gen/qualifiers/background";

export const LocationFinder = (props) => {
  const setCurrentLocation = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (p) => {
          console.log("Position is:", [p.coords.latitude, p.coords.longitude]);

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
    <Container style={{ padding: "0px" }}>
      <button
        onClick={setCurrentLocation}
        style={{
          padding: "5px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
          marginTop: "20px",
          width: "50%",
          border: "2px solid #6A67CE ",
          borderRadius: "10px",
          backgroundColor: "#B1BCE6",
          color: "black",
        }}
      >
        📍 Zoom in my Location
      </button>
    </Container>
  );
};
