import { Container } from "@mui/system";
import { Button } from "../styled";

export const LocationFinder = () => {
  //   [myLocation, setMyLocation] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setStatus(null);
          // setLat(position.coords.latitude);
          console.log("my location", position.coords);
          // setLng(position.coords.longitude);
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
      📍 <Button onClick={getCurrentLocation}>Find my Location</Button>
    </Container>
  );
};
