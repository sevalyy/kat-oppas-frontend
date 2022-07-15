import React from "react";
import { Link } from "react-router-dom";
import Status from "../components/Status";
export default function Cat(props) {
  return (
    <div style={{ padding: 40 }}>
      <img style={{ width: 150, height: 150 }} alt="Cat" src={props.imageUrl} />
      <p>Status:{<Status status={props.status} />}</p>
      <p>From: {props.startDate}</p>
      <p>To: {props.endDate}</p>
      <p>{props.description}</p>

      <p>{props.lattitude}</p>
      <p>{props.longitude}</p>

      <Link to={`/reservations/${props.id}`}>See Details</Link>
    </div>
  );
}
