import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Col, Row } from "react-bootstrap";
import { orderCreation, xmlService } from "../../services/XmlHttpRequest";

interface Props {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  action: "create" | "update" | "delete" | "";
  data?: any;
}

export const ModalComponents: React.FC<Props> = ({
  showModal,
  setShowModal,
  action,
  data,
}) => {
  const [products, setProducts] = useState<any[]>();
  const [op, setOp] = useState<number>(0); // one product
  const [created, setCreated] = useState<orderCreation>({
    client_name: "Nguyễn Văn Bình",
    employee_ID: 1,
    status: "done",
    address: "551, Ấp Sáng Phùng, Xã Sử Hợp Ly, Quận Đoàn Quế Sơn, Phú Yên",
    order_product_id: op,
    product_id: 1,
    quantity: 1,
  });

  const [updated, setUpdated] = useState<any>({
    order_id: data,
    client_image:
      "https://res.cloudinary.com/dsykf3mo9/image/upload/v1637466308/ProductImage/User_oudhn7.png",
    client_name: "a",
    employee_ID: 1,
    status: "done",
    address: "HN",
    product_id: 1,
    quantity: 1,
  });

  const handleClose = () => setShowModal(false);

  const getAllProduct = async () => {
    const response = await xmlService.getAllProduct();
    if (response?.success) {
      setProducts(response?.message);
    }
  };

  const getAllOrders = async () => {
    const response = await xmlService.getAllOrders();

    if (response?.success) {
      setOp(response?.message.length + 1);
    }
  };

  const getOneOrder = async (id: number) => {
    const response = await xmlService.getOneOrder(id);
    if (response?.success) {
      setUpdated({
        ...updated,
        order_id: id,
        client_name: response.message[0].client_name,
        employee_ID: response.message[0].employee_ID,
        status: response.message[0].status,
        address: response.message[0].address,
        product_id: response.message[0].product_id,
        quantity: response.message[0].quantity,
      });
    }
  };

  const handleChangeInput = (e: any): void => {
    e.preventDefault();
    if (action === "create") {
      setCreated({
        ...created,
        [e.target.name]: e.target.value,
      });
    } else if (action === "update") {
      setUpdated({
        ...updated,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (action === "create") {
      const response = await xmlService.createOrder(created);
      if (response?.success) {
        console.log(response.message);
        window.location.reload();
      }
    } else if (action === "update") {
      const response = await xmlService.updateOrder(updated);
      if (response?.success) {
        console.log(response.message);
        window.location.reload();
      }
    }
  };

  const handleDelete = async () => {
    const id = Number(data);
    console.log(id);

    if (action === "delete") {
      const response = await xmlService.deleteOrder(id);
      console.log(response);

      if (response?.success) {
        console.log(response.message);
        window.location.reload();
      }
    }
    setShowModal(false);
  };

  useEffect(() => {
    if (action !== "delete") {
      getAllOrders();
      getAllProduct();
    }
  }, []);

  useEffect(() => {
    if (data && action !== "delete") {
      getOneOrder(data);
      setUpdated({
        ...updated,
        order_id: data,
      });
    }
  }, [data]);

  useEffect(() => {
    setCreated({
      ...created,
      order_product_id: op,
    });
  }, [op]);

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>
          {action === "create"
            ? "Thêm đơn hàng"
            : action !== "delete" && "Chỉnh sửa đơn hàng"}
          {action === "delete" && "Xoá đơn hàng này"}
        </Modal.Title>
      </Modal.Header>
      {action === "delete" ? (
        <>
          <Modal.Body>
            <p>
              Sau khi xoá sẽ hoàn toàn không có trên cơ sở dữ liệu, bạn muốn
              tiếp tục chứ
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
            <Button variant="danger" onClick={handleDelete} type="button">
              Xoá
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Form>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="CustomerNameAndID">
              <Row>
                <Col>
                  <Form.Label>Tên khách hàng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn A"
                    name="client_name"
                    value={
                      action === "create"
                        ? created.client_name
                        : updated.client_name
                    }
                    onChange={handleChangeInput}
                  />
                </Col>

                {action === "update" && (
                  <Col>
                    <Form.Label>Mã đơn hàng</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="mdh12"
                      name="order_id"
                      value={action === "update" && data}
                      readOnly={true}
                    />
                  </Col>
                )}
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="CustomerAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={action === "create" ? created.address : updated.address}
                onChange={handleChangeInput}
                style={{ resize: "none" }}
                placeholder="Số 4, Khu A, Toà B, Tổ C, Quận D, Thành Phố E"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label>Mã nhân viên</Form.Label>
                  <Form.Select
                    aria-label="Floating label "
                    name="employee_ID"
                    value={
                      action === "create"
                        ? created.employee_ID
                        : updated.employee_ID
                    }
                    onChange={handleChangeInput}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Tình trạng</Form.Label>
                  <Form.Select
                    aria-label="Floating label "
                    name="status"
                    value={
                      action === "create" ? created.status : updated.status
                    }
                    onChange={handleChangeInput}
                  >
                    <option value="done">Đã giao hàng</option>
                    <option value="pending">Đang xử lý</option>
                    <option value="cancel">Bị huỷ</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="CustomerProduct">
              <Row>
                <Col>
                  <Form.Label>Sản phẩm</Form.Label>
                  <Form.Select
                    aria-label="Floating label"
                    name="product_id"
                    value={
                      action === "create"
                        ? created.product_id
                        : updated.product_id
                    }
                    onChange={handleChangeInput}
                  >
                    {products &&
                      products?.map((item, index) => (
                        <option value={item.product_id} key={index}>
                          {item.product_name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1"
                    min={1}
                    name="quantity"
                    value={
                      action === "create" ? created.quantity : updated.quantity
                    }
                    onChange={handleChangeInput}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
            <Button
              variant={`${action === "create" ? "success" : "primary"}`}
              onClick={handleSubmit}
              type="button"
            >
              {action === "create" ? "Tạo mới" : "Chỉnh sửa"}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};
