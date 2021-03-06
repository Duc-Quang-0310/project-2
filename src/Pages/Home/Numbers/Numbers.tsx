import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { xmlService } from "../../../services/XmlHttpRequest";
import { Chart } from "./Chart/Chart";

interface commentData {
  content: string;
  author: string;
  background: string;
}

export const Numbers: React.FunctionComponent = () => {
  const [employee, setEmployee] = useState<any[]>([]);
  const [productsName, setProductsName] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  const fetchBestSeller = async () => {
    const response: any = await xmlService.bestSeller();

    if (response?.success) {
      setEmployee(response?.message);
    }
  };

  const fetchTotalProductSold = async () => {
    const response: any = await xmlService.totalProductSold();

    if (response?.success) {
      setProductsName(response?.message.map((item: any) => item.product_name));
      setProductQuantity(response?.message.map((item: any) => item.quantity));
    }
  };

  const fetchTopSellerProduct = async () => {
    const response: any = await xmlService.getTopSeller();
    if (response?.success) {
      setTopProducts(response?.message);
    }
  };

  useEffect(() => {
    fetchBestSeller();
    fetchTotalProductSold();
    fetchTopSellerProduct();
  }, []);

  console.log(topProducts);

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

  return (
    <div className="mt-3 mb-2">
      <Row sm={12} md={8} className="d-flex ">
        <Col sm={12} md={8} className="my-2">
          <div className="number-container shadow-sm px-2 ">
            <Chart ChartData={ChartData} />
          </div>
          <div className="employee-container mt-3 p-2 ">
            <h4>Nh??n vi??n ti??u bi???u</h4>
            <Row>
              {!!employee &&
                employee.map((employee, index) => {
                  return (
                    <Col sm={12} md={4} key={index} className="cursor-pointer">
                      <Card>
                        <div className="employee-bg position-relative mb-4">
                          <Card.Img
                            className="rounded-circle position-absolute employee-img"
                            src={employee.employee_image}
                          />
                        </div>
                        <Card.Body>
                          <h6 className="text-center">{employee.name}</h6>
                          <Card.Text className="mb-0 text-center">
                            ID: {employee.employee_id}
                          </Card.Text>
                          <Card.Text className="mb-0 text-center">
                            Email: {employee.email}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
        <Col sm={12} md={4} className="my-2">
          <div className="number-container shadow-sm p-2 ">
            <h4> S???n ph???m b??n ch???y</h4>
            {topProducts.map((item, index) => {
              return (
                <Card className="my-3 mx-3" key={index}>
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src="/imgs/nature2.png"
                      style={{
                        objectFit: "cover",
                        height: "160px",
                      }}
                    />
                    <Card.Img
                      className="rounded-circle w-25 position-absolute "
                      src={item.product_image}
                      style={{
                        objectFit: "contain",
                        right: "37%",
                        bottom: "-20%",
                      }}
                    />
                  </div>
                  <Card.Body className="position-relative pt-5 pb-3">
                    <blockquote className="blockquote text-center">
                      <p>{item.product_name}</p>
                      <footer className="blockquote-footer text-end ">
                        {item.total} s???n ph???m ???? b??n
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};
