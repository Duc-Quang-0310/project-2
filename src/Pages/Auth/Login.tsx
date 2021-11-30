import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastComp } from "../../components/Toast/ToastComp";
import { sessionHelper } from "../../Helper/sessionHelper";
import { xmlService } from "../../services/XmlHttpRequest";
import "./Login.scss";

export interface accountTypes {
  username: string;
  password: string;
}

export const Login: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  let response: any;
  const [account, setAccount] = useState<accountTypes>({
    username: "",
    password: "",
  });

  //handle data
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    e.preventDefault();
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  //submit
  const handleSubmit = async () => {
    setLoading(true);
    response = await xmlService.login(account);
    setLoading(false);
    if (!response.success) {
      setShowToast(true);
    } else {
      sessionHelper.setItem("username", account.username);
      window.location.reload();
    }
  };

  return (
    <div className="wrapper position-relative">
      <img
        src="imgs/background.jpg"
        alt=""
        className="w-100 position-absolute"
        style={{ height: "100vh" }}
      />
      <div
        className=" position-absolute login-from p-4 rounded "
        style={{ width: "22rem" }}
      >
        <Form className="d-flex flex-column">
          <img
            src="/imgs/lion-head.jpg"
            alt=""
            style={{ width: "60%", marginInline: "auto" }}
          />

          <Form.Group className="mb-3" controlId="CustomerUsername">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control
              type="text"
              value={account.username}
              name="username"
              onChange={handleChangeInput}
              onKeyDown={handleEnter}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="CustomerPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={account.password}
              name="password"
              onChange={handleChangeInput}
              onKeyDown={handleEnter}
            />
          </Form.Group>

          <Button
            type="button"
            className="mx-auto mt-3 w-100 mb-2 py-2"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Đang đăng nhập...." : "Đăng nhập"}
          </Button>
        </Form>
      </div>

      <ToastComp
        type="danger"
        message="Sai tài khoản hoặc mật khẩu"
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </div>
  );
};
