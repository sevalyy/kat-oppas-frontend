import React from "react";
import CompactCat from "../components/CompactCat";
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
                <li key={r.id} style={{ "list-style-type": "none" }}>
                  <CompactCat
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
