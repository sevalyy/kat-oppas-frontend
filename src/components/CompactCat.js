import React from "react";
import { Link } from "react-router-dom";
import Status from "./Status";
export default function CompactCat(props) {
  return (
    <div style={{ padding: 10 }}>
      <img style={{ width: 120, height: 120 }} alt="Cat" src={props.imageUrl} />
      <p style={{ fontSize: "0.8em", marginBottom: "0" }}>
        Status:{<Status status={props.status} />}
      </p>
      <p style={{ fontSize: "0.8em", marginBottom: "0" }}>
        Starting: {props.startDate}
      </p>
      {/* <p>To: {props.endDate}</p> */}
      {/* <p>{props.description}</p>

      <p>{props.lattitude}</p>
      <p>{props.longitude}</p> */}

      <Link to={`/reservations/${props.id}`}>See Details</Link>
    </div>
  );
}
