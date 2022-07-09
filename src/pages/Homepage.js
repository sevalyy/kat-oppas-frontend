import { LocationFinder } from "../components/LocationFinder";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "../store/reservation/thunks";
import { selectAllReservations } from "../store/reservation/selector";

import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Cat from "../components/Cat";
import "./style.css";
// import { Row, Button, Col } from "react-bootstrap";
// use them to create react bootsrap tab button
export function Homepage() {
  const [map, setMap] = useState(null);
  const reservations = useSelector(selectAllReservations);

  const dispatch = useDispatch();

  //tabs for map and list
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  // map position
  const setMapPosition = (latitude, longitude) => {
    // zoom in to your current place
    map.flyTo([latitude, longitude], 15);
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab ${checkActive(0, "active")}`}
          onClick={() => handleClick(0)}
        >
          Map
        </button>
        <button
          className={`tab ${checkActive(1, "active")}`}
          onClick={() => handleClick(1)}
        >
          List{" "}
        </button>
      </div>

      <div className="panels">
        <div className={`panel ${checkActive(0, "active")}`}>
          <div>
            <LocationFinder onPositionFound={setMapPosition} />
            <MapContainer
              center={[52.35, 4.86]}
              zoom={12}
              scrollWheelZoom={true}
              ref={setMap}
              style={{
                border: "2px solid",
                borderRadius: "10px",
                height: "50vw",
                width: "60vw",
                maxWidth: "600px",
                maxHeight: "600px",
                margin: "20px 19.5%",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reservations &&
                reservations.map((reservation) => (
                  <Marker
                    key={reservation.id}
                    position={[reservation.latitude, reservation.longitude]}
                  >
                    {" "}
                    <Popup>
                      <p>
                        from {reservation.startDate} to {reservation.endDate}
                      </p>
                      <Link to={`/reservations/${reservation.id}`}>
                        details
                      </Link>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
        <div className={`panel ${checkActive(1, "active")}`}>
          <div>
            <h1>Here our lovely friends 🐈‍⬛ </h1>
            <hr />
            {reservations.map((reservation) => {
              return (
                <Cat
                  key={reservation.id}
                  id={reservation.id}
                  startDate={reservation.startDate}
                  endDate={reservation.endDate}
                  imageUrl={reservation.imageUrl}
                  // lattitude={reservation.latitude}
                  // longitude={reservation.longitude}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
