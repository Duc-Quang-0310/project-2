import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastType {
  type: "danger" | "success" | "info";
  message: string;
  showToast: boolean;
  setShowToast: (open: boolean) => void;
}

export const ToastComp: React.FunctionComponent<ToastType> = ({
  type,
  message,
  showToast,
  setShowToast,
}) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg={type}
        delay={3000}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Header>
          <img
            src={
              type === "danger"
                ? "https://www.colorhexa.com/dc3545.png"
                : type === "success"
                ? "https://www.colorhexa.com/198754.png"
                : "https://www.colorhexa.com/0dcaf0.png"
            }
            className="rounded me-2"
            style={{ width: "20px", height: "20px" }}
            alt="red-box"
          />
          <strong className="me-auto">
            {type === "danger"
              ? "Cảnh báo"
              : type === "info"
              ? "Thông tin"
              : "Thành công"}
          </strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body style={{ color: "#fff" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
