import { LocationFinder } from "../components/LocationFinder";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "../store/reservation/thunks";
import { selectAllReservations } from "../store/reservation/selector";
import { Container } from "react-bootstrap";
import Cat from "../components/Cat";

import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";

import { Link } from "react-router-dom";

export function Homepage() {
  const dispatch = useDispatch();
  const reservations = useSelector(selectAllReservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div>
      {/* <Container style={{ padding: 50 }}>
        <h1>Here our lovely friends 🐈‍⬛ </h1>
        <LocationFinder />
        <hr />
        {reservations.map((reservation) => {
          return (
            <Cat
              key={reservation.id}
              id={reservation.id}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              lattitude={reservation.latitude}
              longitude={reservation.longitude}
            />
          );
        })}
      </Container> */}
      <LocationFinder />

      <MapContainer
        center={[52.35, 4.88]}
        zoom={12}
        scrollWheelZoom={true}
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

        {reservations.map((reservation) => (
          <Marker
            key={reservation.id}
            position={[reservation.latitude, reservation.longitude]}
          >
            {" "}
            <Popup>
              <p>
                from {reservation.startDate} to {reservation.endDate}
              </p>
              <Link to={`/reservations/${reservation.id}`}>details</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
