import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import "./Home.scss";
import { Numbers } from "./Numbers/Numbers";
import { Static } from "./Static/Static";

export const Home: React.FunctionComponent = () => {
  return (
    <div className="wrapper">
      <Header />
      <Container>
        <Static />
        <Numbers />
      </Container>
    </div>
  );
};
