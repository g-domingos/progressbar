import React from "react";
import { Spinner } from "react-bootstrap";
import { Container } from "./styles";

export function LoadingSpinner() {
  return (
    <Container>
      <Spinner animation="border" role="status"></Spinner>
    </Container>
  );
}
