import { Title } from "../styled";
import styled from "styled-components";
import { Request } from "../components/Request";

export const RequestDetails = () => {
  return (
    <Container>
      <Title> I'm looking for somebody to take care of me</Title>
      <Request />
      <button>Accept</button>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
