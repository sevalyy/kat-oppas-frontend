import React from "react";
import { Link } from "react-router-dom";
import Status from "../components/Status";
export default function Cat(props) {
  return (
    <div
      style={{
        padding: 40,

        border: "1px solid #C9BBCF",
        boxShadow: "0 0 5px 5px #898AA6",
        margin: "20px",
        borderRadius: "10px",
      }}
    >
      <img style={{ width: 150, height: 150 }} alt="Cat" src={props.imageUrl} />
      <p>Status:{<Status status={props.status} />}</p>
      <p>From: {props.startDate}</p>
      <p>To: {props.endDate}</p>
      <p>{props.description}</p>

      <p>{props.lattitude}</p>
      <p>{props.longitude}</p>

      <Link
        to={`/reservations/${props.id}`}
        style={{ fontSize: "0.8em", color: "black" }}
      >
        See Details
      </Link>
    </div>
  );
}
