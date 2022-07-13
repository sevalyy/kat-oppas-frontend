import { Title } from "../styled";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectReservationDetails } from "../store/reservation/selector";
import {
  fetchReservationById,
  acceptReservation,
  cancelReservation,
  approveReservation,
} from "../store/reservation/thunks";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Status from "../components/Status";
import { selectToken, selectUser } from "../store/user/selectors";

export const RequestDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const today = new Date();

  const isTodaySmallerThenStartDate = (startDateAsString) => {
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(startDateAsString);
    startDate.setHours(0, 0, 0, 0);
    const diffTime = startDate - today;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("startdate", startDate, "-", today, "=", diffDays);
    return diffDays > 0;
  };
  const isTodayLaterThenEndDate = (endDateAsString) => {
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(endDateAsString);
    endDate.setHours(0, 0, 0, 0);
    const diffTime = today - endDate;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("enddate", today, "-", endDate, "=", diffDays);
    return diffDays >= 0;
  };
  //isTodayLaterThenEndDate
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
            Owner:
            {reservationDetail.requester && reservationDetail.requester.name}
          </p>
          <p>
            Reservation's Status: <Status status={reservationDetail.status} />
          </p>
          <p>Start Date:{reservationDetail.startDate} </p>
          <p>End Date: {reservationDetail.endDate}</p>
          <p>About 🐾 : {reservationDetail.description}</p>

          {/* cancel button for provider (for new rez. status returns canceled) */}
          {token &&
            reservationDetail.status === 0 &&
            user.id === reservationDetail.requesterUserId && (
              <Button
                onClick={() => {
                  dispatch(cancelReservation(id));
                }}
              >
                Cancel (for new)
              </Button>
            )}

          {/* accept button for non-requester */}
          {token &&
            reservationDetail.status === 0 &&
            user.id !== reservationDetail.requesterUserId && (
              <Button
                onClick={() => {
                  dispatch(acceptReservation(id));
                }}
              >
                Accept
              </Button>
            )}

          {/* Cancel button for requester and provider 
          if provider cancels, status returns new
          if requester cancels, status returns canceled*/}
          {reservationDetail.status === 1 &&
            (reservationDetail.providerUserId === user.id ||
              reservationDetail.requesterUserId === user.id) &&
            isTodaySmallerThenStartDate(reservationDetail.startDate) && (
              <Button
                onClick={() => {
                  dispatch(cancelReservation(id));
                }}
              >
                Cancel (for acccepted)
              </Button>
            )}

          {reservationDetail.status === 1 &&
            reservationDetail.requesterUserId === user.id &&
            isTodayLaterThenEndDate(reservationDetail.endDate) && (
              <Button
                onClick={() => {
                  dispatch(approveReservation(id));
                }}
              >
                Approve
              </Button>
            )}
        </div>
      </Container>
    </Container>
  );
};
