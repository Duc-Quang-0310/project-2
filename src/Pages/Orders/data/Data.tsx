import React from "react";
import { Table } from "react-bootstrap";

export const Data: React.FC = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã đơn </th>
          <th>Mã nhân viên</th>
          <th>Số sản phẩm</th>
          <th>Tình trạng</th>
          <th>Thời gian</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};
