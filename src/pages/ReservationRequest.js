// import { Link } from "react-router-dom";

import styled from "styled-components";
import { Request } from "../components/Request";
import React from "react";

export const ReservationRequest = () => {
  return (
    <Container>
      <h2> Reservation Request</h2>
      <Request />
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
