import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { Data } from "./data/Data";
import { Scale } from "./Scale/Scale";

export const Order: React.FunctionComponent = () => {
  return (
    <div className="wrapper">
      <Header />
      <Container>
        <Scale />
        <Data />
      </Container>
    </div>
  );
};
