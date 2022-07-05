import { Title } from "../styled";
import { Link } from "react-router-dom";
import { LinkWord } from "../styled";
import styled from "styled-components";
import { Request } from "../components/Request";

export const ReservationRequest = () => {
  return (
    <Container>
      <h2> Reservation Request</h2>
      <Request />
      <button>Submit</button>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
