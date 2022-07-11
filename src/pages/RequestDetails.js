import { Title } from "../styled";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectReservationDetails } from "../store/reservation/selector";
import {
  fetchReservationById,
  acceptReservation,
} from "../store/reservation/thunks";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Status from "../components/Status";

import { selectToken, selectUser } from "../store/user/selectors";

export const RequestDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const reservationDetail = useSelector(selectReservationDetails);

  useEffect(() => {
    dispatch(fetchReservationById(id));
  }, [dispatch, id]);

  if (!reservationDetail) return <div>There is no request with this id</div>;
  console.log("details", reservationDetail);

  return (
    <Container>
      <Title> I'm looking for somebody to take care of me</Title>

      <Container
        style={{ display: "flex", justifyContent: "center", padding: 30 }}
      >
        <div style={{ padding: 30 }}>
          <img
            style={{ width: 300, height: 400 }}
            src={reservationDetail.imageUrl}
            alt={reservationDetail.id}
          />
        </div>

        <div style={{ padding: 30 }}>
          <p>
            Status: <Status status={reservationDetail.status} />
          </p>
          <p>Start Date:{reservationDetail.startDate} </p>
          <p>End Date: {reservationDetail.endDate}</p>

          <p>About the cat: {reservationDetail.description}</p>

          {token && reservationDetail.status === 0 ? (
            <Button
              onClick={() => {
                dispatch(acceptReservation(id));
              }}
            >
              Accept
            </Button>
          ) : null}
          {reservationDetail.status === 1 &&
          (reservationDetail.providerUserId === user.id ||
            reservationDetail.requesterUserId === user.id) ? (
            <Button>Cancel</Button>
          ) : null}
        </div>
      </Container>
    </Container>
  );
};
