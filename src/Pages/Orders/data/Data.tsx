import React, { useState, useEffect } from "react";
import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ModalComponents } from "../../../components/Modals/ModalComponents";
import { xmlService } from "../../../services/XmlHttpRequest";

interface Props {
  filter: "total" | "done" | "pending" | "cancel";
}

export interface ordersDataTypes {
  order_id: number;
  employee_ID: number;
  quantity: number;
  status: string;
  finish_date: Date;
}

export const Data: React.FC<Props> = ({ filter }) => {
  const [ShowModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [ID, setID] = useState<number>();
  const [orders, setOrders] = useState<any[]>([]);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | ""
  >("");
  const history = useHistory();

  function convertStatus(status: string) {
    if (status === "done") {
      return "Đã giao hàng";
    }
    if (status === "pending") {
      return "Đang xử lý";
    }
    if (status === "cancel") {
      return "Bị huỷ";
    }
  }

  const renderTitle = (status: "total" | "done" | "pending" | "cancel") => {
    if (status === "total")
      return <h5 className="text-uppercase">Tổng đơn hàng</h5>;
    if (status === "done")
      return <h5 className="text-uppercase">Đơn đã giao</h5>;
    if (status === "pending")
      return <h5 className="text-uppercase">Đơn hàng đang được xử lý </h5>;
    if (status === "cancel")
      return <h5 className="text-uppercase">Đơn hàng bị huỷ</h5>;
  };

  const redirect = (data: ordersDataTypes) => {
    history.push(
      `/orders/${data.order_id}&${data.employee_ID}&${data.quantity}&${data.status}&${data.finish_date}`
    );
  };

  const redirectToUpdate = (id: number): any => {
    setShowModal(true);
    setModalAction("update");
    setIsUpdating(true);
    setID(id);
  };

  const renderTable = (data: ordersDataTypes, index: any): any => {
    return (
      <tr key={index} className="cursor-pointer">
        <td className="text-center" onClick={() => redirect(data)}>
          {data.order_id}
        </td>
        <td className="text-center" onClick={() => redirect(data)}>
          {data.order_id}
        </td>
        <td className="text-center" onClick={() => redirect(data)}>
          {data.employee_ID}
        </td>
        <td className="text-center" onClick={() => redirect(data)}>
          {data.quantity}
        </td>
        <td className="text-center fw-500" onClick={() => redirect(data)}>
          {data && convertStatus(data.status)}
        </td>
        <td className="text-center" onClick={() => redirect(data)}>
          {data.finish_date}
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center ">
            <Button
              className="px-3"
              style={{ marginInlineEnd: "15px" }}
              onClick={() => redirectToUpdate(data.order_id)}
            >
              <i className="bi bi-pencil"></i>
            </Button>

            <Button
              variant="danger"
              className="px-3"
              onClick={() => {
                setShowModal(true);
                setModalAction("delete");
                setIsUpdating(true);
                setID(data.order_id);
              }}
            >
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  const getAllOrders = async () => {
    const response = await xmlService.getAllOrders();

    if (response?.success) {
      setOrders(response?.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="mx-4">
      <div className="d-flex align-items-center">
        {renderTitle(filter)}
        <OverlayTrigger
          overlay={<Tooltip>Thêm đơn hàng</Tooltip>}
          placement="left"
        >
          <span className="d-inline-block add-order-btn rounded">
            <Button
              className="add-order-btn btn px-4"
              onClick={() => {
                setShowModal(true);
                setModalAction("create");
              }}
            >
              <i className="bi bi-plus-lg "></i>
            </Button>
          </span>
        </OverlayTrigger>
      </div>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Mã đơn</th>
            <th className="text-center">Mã nhân viên</th>
            <th className="text-center">Số sản phẩm</th>
            <th className="text-center">Tình trạng</th>
            <th className="text-center">Thời gian</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="my-link">
          {filter === "total" &&
            orders.map((item, index) => renderTable(item, index))}
          {orders
            .filter((data) => data.status === filter)
            .map((data, index) => renderTable(data, index))}
        </tbody>
      </Table>
      <ModalComponents
        showModal={ShowModal}
        setShowModal={setShowModal}
        action={modalAction}
        data={isUpdating && ID}
      />
    </div>
  );
};
