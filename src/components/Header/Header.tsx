import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { LeftBar } from "../Drawer/LeftBar";
import "./Header.scss";

export const Header: React.FunctionComponent = () => {
  const [OpenLeftBar, setOpenLeftBar] = useState<boolean>(false);

  return (
    <>
      <Nav className="px-5 py-2 justify-content-around header ">
        <div
          className="header-logo"
          onClick={() => setOpenLeftBar(!OpenLeftBar)}
        >
          <img src="/imgs/lion-head.png" alt="lion-head" />
        </div>
        <div className="header-search my-auto ">
          <input
            className="px-2 py-1"
            type="text"
            placeholder="Gõ để tìm kiếm ...."
          />
          <Button className="btn btn-search mx-3 px-4 ">
            <i className="bi bi-search"></i>
          </Button>
        </div>
        <div className="header-notification d-flex  justify-content-center">
          <div
            style={{ backgroundColor: "#59b828" }}
            className="my-auto header-notification-icon px-2 py-1 rounded-circle mx-3 header-notification-icon-account"
          >
            <i className="bi bi-person"></i>
          </div>
          <div
            style={{ backgroundColor: "#0d6efd" }}
            className="my-auto header-notification-icon px-2 py-1 rounded-circle mx-3 header-notification-icon-noti "
          >
            <i className="bi bi-bell"></i>
          </div>
        </div>
      </Nav>
      <LeftBar open={OpenLeftBar} setOpen={setOpenLeftBar} />
    </>
  );
};
