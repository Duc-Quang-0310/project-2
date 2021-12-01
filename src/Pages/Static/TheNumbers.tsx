import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { xmlService } from "../../services/XmlHttpRequest";
import { Chart } from "../Home/Numbers/Chart/Chart";

export const TheNumbers: React.FunctionComponent = () => {
  const [productsName, setProductsName] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

  const ChartData = {
    labels: productsName,
    datasets: [
      {
        data: productQuantity,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const fetchTotalProductSold = async () => {
    const response: any = await xmlService.totalProductSold();

    if (response?.success) {
      setProductsName(response?.message.map((item: any) => item.product_name));
      setProductQuantity(response?.message.map((item: any) => item.quantity));
    }
  };

  useEffect(() => {
    fetchTotalProductSold();
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <Container className="pt-5">
        <Chart ChartData={ChartData} />
      </Container>
    </div>
  );
};
