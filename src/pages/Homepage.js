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
import { Title } from "../styled";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export function Homepage() {
  const [map, setMap] = useState(null);
  const reservations = useSelector(selectAllReservations);

  const dispatch = useDispatch();

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
    <>
      <Container
        style={{
          padding: "0",
          marginRight: "10px",
          marginLeft: "30px",
          minHeight: "650px",
        }}
      >
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-2"
          fill
          justify
          style={{
            padding: "20px",
          }}
        >
          <Tab eventKey="home" title="See on Map">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <MapContainer
                center={[52.35, 4.86]}
                zoom={12}
                scrollWheelZoom={true}
                ref={setMap}
                style={{
                  border: "2px solid #6A67CE",
                  borderRadius: "10px",
                  height: "60vw",
                  width: "80%",
                  maxWidth: "800px",
                  maxHeight: "400px",
                  margin: "10px 10.5%",
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
                        <img
                          src={reservation.imageUrl}
                          alt="cat"
                          style={{ height: 40, weight: 40 }}
                        />
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
            <LocationFinder onPositionFound={setMapPosition} />
          </Tab>
          <Tab eventKey="requests" title="See All Requests">
            <div>
              <Title> Here Our Lovely Friends 🐈‍⬛ </Title>
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {reservations.map((reservation) => {
                  return (
                    <Cat
                      key={reservation.id}
                      id={reservation.id}
                      startDate={reservation.startDate}
                      endDate={reservation.endDate}
                      imageUrl={reservation.imageUrl}
                      status={reservation.status}
                    />
                  );
                })}
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
