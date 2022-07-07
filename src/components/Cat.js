import React from "react";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Art(props) {
  return (
    <div style={{ padding: 40 }}>
      <img
        style={{ width: 200, height: 250 }}
        alt="Cat"
        src="https://cataas.com/cat?width=300"
      />

      <p>From: {props.startDate}</p>
      <p>To: {props.endDate}</p>
      <p>{props.description}</p>
      <p>{props.lattitude}</p>
      <p>{props.longitude}</p>

      <Link to={`/reservations/${props.id}`}>See Details</Link>
    </div>
  );
}
