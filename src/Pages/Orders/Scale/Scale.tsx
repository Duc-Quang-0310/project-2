import React, { ReactNode } from "react";
import { Col, Row, Card } from "react-bootstrap";

interface dataTypes {
  total: number;
  text: string;
  icon: ReactNode;
}

export const Scale: React.FC = () => {
  const data: dataTypes[] = [
    {
      total: 100,
      text: "Tổng đơn hàng",
      icon: (
        <i className="bi bi-check2-all card-icon-1 rounded-circle px-3 py-1"></i>
      ),
    },
    {
      total: 60,
      text: "Đơn đã giao",
      icon: (
        <i className="bi bi-bag-check card-icon-2 rounded-circle px-3 py-1"></i>
      ),
    },
    {
      total: 30,
      text: "Đang xử lý",
      icon: (
        <i className="bi bi-hourglass card-icon-3 rounded-circle px-3 py-1"></i>
      ),
    },
    {
      total: 10,
      text: "Đơn huỷ",
      icon: (
        <i className="bi bi-x-lg card-icon-4 rounded-circle  px-3 py-1"></i>
      ),
    },
  ];
  return (
    <div className="mt-3 mb-2">
      <Row>
        {data.map((item, index) => {
          return (
            <Col sm={12} md={6} lg={3} key={index} className="py-3 ">
              <Card className="static shadow-sm rounded">
                <Card.Body
                  className={`d-flex flex-row-reverse card-color-${
                    index + 1
                  }  `}
                >
                  <div className="card-content w-75 d-flex flex-column px-3 ">
                    <p className="text-white text-uppercase mb-0 fw-500 ">
                      {item.text}
                    </p>
                    <h3 className="text-white">{item.total}</h3>
                  </div>
                  <div className="card-content w-25 d-flex justify-content-center align-items-center">
                    {item.icon}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
