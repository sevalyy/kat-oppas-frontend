import { Title } from "../styled";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectReservationDetails } from "../store/reservation/selector";
import {
  fetchReservationById,
  acceptReservation,
} from "../store/reservation/thunks";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { selectToken } from "../store/user/selectors";

export const RequestDetails = () => {
  const { id } = useParams();

  const reservationDetail = useSelector(selectReservationDetails);
  //   const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservationById(id));
  }, [dispatch, id]);

  if (!reservationDetail) return <div>There is no request with this id</div>;
  console.log("details", reservationDetail);
  return (
    <Container>
      <Title> I'm looking for somebody to take care of me</Title>
      <Container className="d-flex justify-content-around">
        <div className="p-2 col-example text-left">
          <img
            style={{ width: 300, height: 400 }}
            src={reservationDetail.imageUrl}
            alt={reservationDetail.id}
          />
        </div>

        <div className="p-2 col-example text-left">
          <p>Start Date:{reservationDetail.startDate} </p>
          <p>End Date: {reservationDetail.endDate}</p>

          <p>{reservationDetail.description}</p>
          <Button
            onClick={() => {
              dispatch(acceptReservation(id));
            }}
          >
            Accept
          </Button>
        </div>
      </Container>
    </Container>
  );
};
