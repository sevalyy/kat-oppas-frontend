import React from "react";
// import Button from "react-bootstrap/Button";
import Cat from "../components/Cat";
export default function CatList(props) {
  return (
    <div>
      <ul>
        <h2>{props.title}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {props.reservations
            .filter(
              (curReservation) => props.filterReservations(curReservation)
              // myReservations.requesterUserId === userDetails.id
            )
            .map((r) => {
              return (
                <li key={r.id}>
                  <Cat
                    key={r.id}
                    id={r.id}
                    status={r.status}
                    startDate={r.startDate}
                    endDate={r.endDate}
                    imageUrl={r.imageUrl}

                    // lattitude={reservation.latitude}
                    // longitude={reservation.longitude}
                  />
                </li>
              );
            })}
        </div>
      </ul>
    </div>
  );
}
