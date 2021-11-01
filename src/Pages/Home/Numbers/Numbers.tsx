import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Chart } from "./Chart/Chart";

interface commentData {
  content: string;
  author: string;
  background: string;
}

interface employeeData {
  name: string;
  avatar: string;
  id: string;
  email: string;
}

export const Numbers: React.FunctionComponent = () => {
  const ChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 4", "Tháng 6", "Tháng 8", "Tháng 10"],
    datasets: [
      {
        data: [620, 223, 325, 389, 412, 520],
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

  const CommentData: commentData[] = [
    {
      content: "Sản phẩm tốt",
      author: "Khách hàng 01 ",
      background: "/imgs/nature2.png",
    },
    {
      content: "Tôi rất thích",
      author: "Khách hàng 02 ",
      background: "/imgs/nature.jpg",
    },
  ];

  const EmployeeData: employeeData[] = [
    {
      name: "Nguyễn Đức Lộc",
      avatar: "/imgs/man1.jpg",
      id: "12567",
      email: "example@gmail.com",
    },
    {
      name: "Nguyễn Đức Long",
      avatar: "/imgs/man2.jpg",
      id: "15842",
      email: "example@gmail.com",
    },
    {
      name: "Nông Văn Lâm",
      avatar: "/imgs/man3.jpg",
      id: "32574",
      email: "example@gmail.com",
    },
  ];

  return (
    <div className="mt-3 mb-2">
      <Row sm={12} md={8} className="d-flex ">
        <Col sm={12} md={8} className="my-2">
          <div className="number-container shadow-sm px-2 ">
            <Chart ChartData={ChartData} />
          </div>
          <div className="employee-container mt-3 p-2 ">
            <h4>Nhân viên</h4>
            <Row>
              {EmployeeData.map((employee, index) => {
                return (
                  <Col sm={12} md={4} key={index} className="cursor-pointer">
                    <Card>
                      <div className="employee-bg position-relative mb-4">
                        <Card.Img
                          className="rounded-circle position-absolute"
                          src={employee.avatar}
                          style={{
                            objectFit: "cover",
                            height: "80px",
                            width: "80px",
                            bottom: "-40%",
                            left: "35%",
                          }}
                        />
                      </div>
                      <Card.Body>
                        <h6 className="text-center">{employee.name}</h6>
                        <Card.Text className="mb-0 text-center">
                          ID: {employee.id}
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
            <h4> Bình luận mới</h4>
            {CommentData.map((comment, index) => {
              return (
                <Card className="my-3 mx-3" key={index}>
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={comment.background}
                      style={{
                        objectFit: "cover",
                        height: "160px",
                      }}
                    />
                    <Card.Img
                      className="rounded-circle w-25 position-absolute "
                      src="https://picsum.photos/100/100?grayscale?random=2"
                      style={{
                        objectFit: "contain",
                        right: "37%",
                        bottom: "-20%",
                      }}
                    />
                  </div>
                  <Card.Body className="position-relative pt-5 pb-3">
                    <blockquote className="blockquote text-center">
                      <p>"{comment.content}"</p>
                      <footer className="blockquote-footer text-end ">
                        {comment.author}
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
