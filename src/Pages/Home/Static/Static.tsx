import React, { ReactNode, useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { route } from "../../../Constants/Routes/routesName";
import { xmlService } from "../../../services/XmlHttpRequest";

interface dataTypes {
  view: number | undefined;
  quote: string;
  icon: ReactNode;
  to: string;
}

export const Static: React.FC = () => {
  const [quantity, setQuantity] = useState<number | undefined>();

  const getAllOrders = async () => {
    const response = await xmlService.getAllOrders();

    if (response?.success) {
      setQuantity(response?.message.length);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const data: dataTypes[] = [
    {
      view: 150,
      quote: "Số lượt truy cập vào trang web",
      icon: (
        <i className="bi bi-eye-fill card-icon-1 rounded-circle  px-3 py-1 "></i>
      ),
      to: route.HOME,
    },
    {
      view: quantity,
      quote: "Số đơn hàng trong dữ liệu",
      icon: (
        <i className="bi bi-receipt card-icon-2 rounded-circle  px-3 py-1 "></i>
      ),
      to: route.ORDER,
    },
    {
      view: 87,
      quote: "Số cập nhật mới chưa đọc",
      icon: (
        <i className="bi bi-bell card-icon-3 rounded-circle  px-3 py-1 "></i>
      ),
      to: route.HOME,
    },
  ];

  return (
    <div className="mt-3 mb-2">
      <Row>
        {data.map((item, index) => {
          return (
            <Col sm={12} md={4} key={index} className="py-3 ">
              <Link to={item.to}>
                <Card className="static shadow-sm">
                  <Card.Body
                    className={`d-flex flex-row card-color-${index + 1} `}
                  >
                    <div className="card-content w-75 d-flex flex-column ">
                      <h3 className="text-white fw-500 ">{item.view}</h3>
                      <p className="m-0 text-white ">{item.quote}</p>
                    </div>
                    <div className="card-content w-25 d-flex justify-content-center align-items-center">
                      {item.icon}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
