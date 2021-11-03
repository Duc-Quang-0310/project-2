import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { Data } from "./data/Data";
import { Scale } from "./Scale/Scale";

export const Order: React.FunctionComponent = () => {
  const [filter, setfilter] = useState<"total" | "done" | "pending" | "cancel">(
    "total"
  );

  useEffect(() => {
    document.title = "Đơn hàng";
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <Container>
        <Scale setfilter={setfilter} />
        <Data filter={filter} />
      </Container>
    </div>
  );
};
