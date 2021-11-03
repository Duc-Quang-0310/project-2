import React from "react";
import { Form, Modal, Button, Col, Row } from "react-bootstrap";

interface Props {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  action: "create" | "update" | "delete" | "";
}

export const ModalComponents: React.FC<Props> = ({
  showModal,
  setShowModal,
  action,
}) => {
  const handleClose = () => setShowModal(false);
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
            <Button
              variant="danger"
              onClick={() => setShowModal(false)}
              type="submit"
            >
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
                  <Form.Control type="text" placeholder="Nguyễn Văn A" />
                </Col>

                {action === "update" && (
                  <Col>
                    <Form.Label>Mã đơn hàng</Form.Label>
                    <Form.Control type="text" placeholder="mdh12" />
                  </Col>
                )}
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="CustomerAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none" }}
                placeholder="Số 4, Khu A, Toà B, Tổ C, Quận D, Thành Phố E"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Row>
                <Col>
                  <Form.Label>Mã nhân viên</Form.Label>
                  <Form.Control type="text" placeholder="mnv22" />
                </Col>
                <Col>
                  <Form.Label>Tình trạng</Form.Label>
                  <Form.Select aria-label="Floating label select example">
                    <option value="done">Đã giao hàng</option>
                    <option value="pending">Đang xử lý</option>
                    <option value="cancel">Bị huỷ</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-2" controlId="CustomerAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none" }}
                placeholder="Mã sản phẩm_Số lượng, Mã sản phẩm 2_Số lượng 2, ..."
              />
              <Form.Text className="text-muted">
                Cách nhập : Mã sản phẩm_Số lượng. Ví dụ: cmtt45_2, cmtc75_1
              </Form.Text>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
            <Button
              variant={`${action === "create" ? "success" : "primary"}`}
              onClick={() => setShowModal(false)}
              type="submit"
            >
              {action === "create" ? "Tạo mới" : "Chỉnh sửa"}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};
