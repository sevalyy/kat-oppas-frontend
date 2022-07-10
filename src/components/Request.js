import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { postNewReservation } from "../store/reservation/thunks";
import { LocationFinder } from "./LocationFinder";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet";
import moment from "moment";
import { Image } from "react-bootstrap";
import L from "leaflet";
import { showMessageWithTimeout } from "../store/appState/thunks";
//for shwing images with cloudinary
// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary } from "@cloudinary/url-gen";

export const Request = (props) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [map, setMap] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  //************************* Add Photo
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "zbgxytqv");
    console.log("Uploading image.");
    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drik39i9c/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    console.log("Image upload completed.");
    const file = await res.json();
    console.log("Remote url:", file.url); //check if you are getting the url back
    setImageUrl(file.url); //put the url in local state, next step you can send it to the backend
  };
  //***********************
  const todayString = moment().format("YYYY-MM-DD");

  const setMyLocation = (newLatitude, newLongitude) => {
    console.log("Before Flying to ..");
    setSelectedLocation({ latitude: newLatitude, longitude: newLongitude });
    console.log("Flying to ..");
    map.flyTo([newLatitude, newLongitude], 15);
    console.log("Flying done ..", map);
  };

  function submitForm(event) {
    event.preventDefault();

    if (!selectedLocation) {
      dispatch(
        showMessageWithTimeout("fail", false, "Please pick a location", 5000)
      );
      return;
    }
    const { latitude, longitude } = selectedLocation;
    dispatch(
      postNewReservation(
        startDate,
        endDate,
        description,
        longitude,
        latitude,
        imageUrl
      )
    );
    setDescription("");
    setImageUrl(null);
    // navigate("/");
  }

  useEffect(() => {
    if (map) {
      function onMapClick(e) {
        console.log("Map was clicked", e);
        setSelectedLocation({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      }
      map.on("click", onMapClick);
    }
  }, [map]);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Cat's image: </Form.Label>
          <Form.Control type="file" size="sm" onChange={uploadImage} />
          <div>
            <Image
              style={{ height: 100, weight: 100 }}
              src={
                imageUrl
                  ? imageUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
            />
            {imageUrl ? (
              <p style={{ fontSize: 20 }}>Succesfully uploaded!</p>
            ) : (
              ""
            )}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date: </Form.Label>
          <Form.Control
            onChange={(event) => setStartDate(event.target.value)}
            type="date"
            min={todayString}
            max="2023-12-31"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Date: </Form.Label>
          <Form.Control
            onChange={(event) => setEndDate(event.target.value)}
            type="date"
            min={todayString} //start date
            max="2023-12-31"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>About my cat: </Form.Label>
          <Form.Control
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            value={description}
          />
          <MapContainer
            center={[52.35, 4.86]}
            zoom={12}
            scrollWheelZoom={true}
            ref={setMap}
            style={{
              border: "2px solid",
              borderRadius: "10px",
              height: "30vw",
              width: "40vw",
              maxWidth: "600px",
              maxHeight: "600px",
              margin: "20px 19.5%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedLocation && (
              <Marker
                position={[
                  selectedLocation.latitude,
                  selectedLocation.longitude,
                ]}
              ></Marker>
            )}
          </MapContainer>
        </Form.Group>

        <LocationFinder onPositionFound={setMyLocation} />

        <Form.Group>
          <Button type="submit" onClick={submitForm}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
