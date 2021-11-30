import React, { ReactNode, useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { xmlService } from "../../../services/XmlHttpRequest";
import { ordersDataTypes } from "../data/Data";

interface dataTypes {
  total: number;
  text: string;
  icon: ReactNode;
  filter: "total" | "done" | "pending" | "cancel";
}

interface Props {
  setfilter: (filter: "total" | "done" | "pending" | "cancel") => void;
}

export const Scale: React.FC<Props> = ({ setfilter }) => {
  const [Done, setDone] = useState<number>(0);
  const [Pending, setPending] = useState<number>(0);
  const [Cancel, setCancel] = useState<number>(0);
  const [orders, setOrders] = useState<any[]>([]);

  const getAllOrders = async () => {
    const response = await xmlService.getAllOrders();

    if (response?.success) {
      setOrders(response?.message);
    }
  };

  function getValue(
    type: "done" | "pending" | "cancel",
    data: ordersDataTypes[]
  ) {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === type) {
        result = result + 1;
      }
    }
    if (type === "done") {
      setDone(result);
    }
    if (type === "pending") {
      setPending(result);
    }
    if (type === "cancel") {
      setCancel(result);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    getValue("done", orders);
    getValue("pending", orders);
    getValue("cancel", orders);
  }, [orders]);

  const data: dataTypes[] = [
    {
      total: orders.length,
      text: "Tổng đơn hàng",
      icon: (
        <i className="bi bi-check2-all card-icon-1 rounded-circle px-3 py-1"></i>
      ),
      filter: "total",
    },
    {
      total: Done,
      text: "Đơn đã giao",
      icon: (
        <i className="bi bi-bag-check card-icon-2 rounded-circle px-3 py-1"></i>
      ),
      filter: "done",
    },
    {
      total: Pending,
      text: "Đang xử lý",
      icon: (
        <i className="bi bi-hourglass card-icon-3 rounded-circle px-3 py-1"></i>
      ),
      filter: "pending",
    },
    {
      total: Cancel,
      text: "Đơn huỷ",
      icon: (
        <i className="bi bi-x-lg card-icon-4 rounded-circle  px-3 py-1"></i>
      ),
      filter: "cancel",
    },
  ];
  return (
    <div className="mt-3 mb-2">
      <Row>
        {data.map((item, index) => {
          return (
            <Col
              sm={12}
              md={6}
              lg={3}
              key={index}
              className="py-3"
              onClick={() => setfilter(item.filter)}
            >
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
