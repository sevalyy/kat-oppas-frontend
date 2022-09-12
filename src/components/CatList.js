import React from "react";
import Cat from "../components/Cat";
export default function CatList(props) {
  return (
    <div>
      <ul>
        <h2 style={{ textAlign: "center" }}>{props.title} </h2>
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
                <li key={r.id} style={{ listStyleType: "none" }}>
                  <Cat
                    key={r.id}
                    id={r.id}
                    status={r.status}
                    startDate={r.startDate}
                    endDate={r.endDate}
                    imageUrl={r.imageUrl}
                  />
                </li>
              );
            })}
        </div>
      </ul>
    </div>
  );
}
