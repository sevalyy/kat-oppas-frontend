// import { Link } from "react-router-dom";

import { Request } from "../components/Request";
import React from "react";
import { Title } from "../styled";
import { Container } from "react-bootstrap";

export const ReservationRequest = () => {
  return (
    <Container>
      <Title> Reservation Request</Title>
      <Request />
    </Container>
  );
};

// const Container = styled.div`
//   margin: 20px;
// `;
