import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => (props.primary ? "#B22727" : "#e5e5e5")};
  color: ${(props) => (props.primary ? "white" : "black")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #5687d6;
  border-radius: 3px;

  &:hover {
    border: 2px solid #1e3163;
  }
`;
