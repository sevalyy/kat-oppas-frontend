// import { Link } from "react-router-dom";

import { Request } from "../components/Request";
import React from "react";
import { Title } from "../styled";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

export const ReservationRequest = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  return (
    <Container>
      <Title> Reservation Request</Title>
      <Request />
    </Container>
  );
};
