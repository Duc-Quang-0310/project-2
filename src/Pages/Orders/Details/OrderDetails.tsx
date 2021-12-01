import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { ModalComponents } from "../../../components/Modals/ModalComponents";
import { xmlService } from "../../../services/XmlHttpRequest";
import "./Details.scss";

interface params {
  params: string;
}

interface orderData {
  order_id: number;
  employee_ID: number;
  quantity: number;
  status: string;
  finish_date: string;
}

export const OrderDetails: React.FunctionComponent = () => {
  const { params }: params = useParams();
  const history = useHistory();
  const [ShowModal, setShowModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [employee, setEmployee] = useState<any>({});
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | ""
  >("");

  const orderData: orderData = {
    order_id: Number(params.split("&")[0]),
    employee_ID: Number(params.split("&")[1]),
    quantity: parseInt(params.split("&")[2]),
    status: params.split("&")[3],
    finish_date: params.split("&")[4],
  };

  const getOneOrder = async () => {
    const response = await xmlService.getOneOrder(orderData.order_id);
    if (response?.success) {
      setData(response?.message[0]);
    }
  };

  const getEmployee = async () => {
    const response = await xmlService.getEmployee(orderData.employee_ID);
    if (response?.success) {
      setEmployee(response?.message);
    }
  };

  useEffect(() => {
    getOneOrder();
    getEmployee();
  }, []);

  function render(status: string) {
    if (status === "done") {
      return (
        <div className="d-flex align-items-center icon-wrapper-done rounded flex-column ">
          <i className="bi bi-check2-circle icon-done"></i>
          <h3 className="text-uppercase text-white mb-4  ">Đã giao hàng</h3>
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className="d-flex align-items-center icon-wrapper-pending rounded flex-column ">
          <i className="bi bi-dash-circle icon-done"></i>
          <h3 className="text-uppercase text-white mb-4  ">Đang xử lý</h3>
        </div>
      );
    }
    if (status === "cancel") {
      return (
        <div className="d-flex align-items-center icon-wrapper-cancel rounded flex-column ">
          <i className="bi bi-x-circle icon-done"></i>
          <h3 className="text-uppercase text-white mb-4 ">Đã bị huỷ</h3>
        </div>
      );
    }
  }

  useEffect(() => {
    document.title = "Chi tiết đơn hàng";
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Container className="px-5">
        <div className="mt-3 d-flex">
          <Button
            className="details-back-btn px-4"
            onClick={() => history.goBack()}
          >
            <i className="bi bi-arrow-left "></i>
            <span>Quay lại</span>
          </Button>
          <Button
            className="details-edit-btn px-4"
            onClick={() => {
              setShowModal(true);
              setModalAction("update");
            }}
          >
            <span>Chỉnh sửa</span>
            <i className="bi bi-pencil "></i>
          </Button>
          <Button
            className="details-delete-btn px-4"
            onClick={() => {
              setShowModal(true);
              setModalAction("delete");
            }}
            variant="danger"
          >
            <span>Xoá</span>
            <i className="bi bi-x-lg "></i>
          </Button>
        </div>
        <div className="order-details mt-3 mb-3">{render(data.status)}</div>
        <Row>
          <Col sm={12} md={6} className="px-4 mb-2">
            <Card>
              <Row className="p-2">
                <Col sm={5}>
                  <div className="details-user rounded d-flex align-items-center justify-content-center">
                    <img
                      src={data.client_image}
                      alt="user-avatar"
                      className="details-user-avatar rounded-circle"
                    />
                  </div>
                </Col>
                <Col sm={7}>
                  <h5 className="mb-3 text-center mt-2 ">Khách hàng</h5>
                  <p className="mb-1">
                    <strong>Họ và tên: </strong> {data.client_name}
                  </p>
                  <p className="mb-1">
                    <strong>Địa chỉ giao hàng: </strong> {data.address}
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={12} md={6} className="px-4 mb-2">
            <Card>
              <Row className="p-2">
                <Col sm={5}>
                  <div className="details-user rounded d-flex align-items-center justify-content-center details-employee">
                    <img
                      src={employee.employee_image}
                      alt="user-avatar"
                      className="details-user-avatar rounded-circle"
                    />
                  </div>
                </Col>
                <Col sm={7}>
                  <h5 className="mb-3 text-center mt-2">Nhân viên</h5>
                  <p className="mb-1">
                    <strong>Họ và tên: </strong> {employee.name}
                  </p>
                  <p className="mb-1">
                    <strong>Mã nhân viên: </strong> {employee.employee_id}
                  </p>
                  <p className="mb-1">
                    <strong>Email: </strong> {employee.email}
                  </p>
                  <p className="mb-1">
                    <strong>Số điện thoại: </strong> {employee.phonenumber}
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="px-4 mt-2">
          <Card className="px-0">
            <Card.Header
              className="text-center text-uppercase fw-500 text-white py-3"
              style={{ backgroundColor: "#59b828" }}
            >
              Thông tin đơn hàng
            </Card.Header>
            <Card.Body>
              <ul className="details-list px-3">
                <li>
                  <p className="mb-1">
                    <strong>Mã đơn hàng: </strong>
                    {orderData.order_id}
                  </p>
                </li>
                <li>
                  <p className="mb-1">
                    <strong>Số lượng: </strong>
                    {data.quantity}
                  </p>
                </li>
                <li>
                  <p className="mb-1">
                    <strong>Thời gian: </strong>
                    {data.finish_date}
                  </p>
                </li>
                <li>
                  <strong>Sản phẩm: </strong>
                  <div>
                    <Col lg={3} className="rounded mt-3">
                      <Card>
                        <Card.Img
                          className="p-2"
                          variant="top"
                          src={data.product_image}
                        />
                        <Card.Body className="pt-0">
                          <h6 className="text-center">{data.product_name}</h6>
                          <p className="text-center">{data.product_price}</p>

                          <p className="text-center fw-500 mb-0">
                            x{data.quantity}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <ModalComponents
        showModal={ShowModal}
        setShowModal={setShowModal}
        action={modalAction}
        data={orderData.order_id}
      />
    </div>
  );
};
