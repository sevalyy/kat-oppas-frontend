import React from "react";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Art(props) {
  return (
    <div>
      <img
        style={{ width: 300, height: 400 }}
        alt="Cat"
        src="https://cataas.com/cat?width=300"
      />

      <p>{props.startDate}</p>
      <p>{props.endDate}</p>
      <p>{props.description}</p>
      <p>{props.lattitude}</p>
      <p>{props.longitude}</p>

      <Link to={`/reservations/${props.id}`}>See Details</Link>
    </div>
  );
}
