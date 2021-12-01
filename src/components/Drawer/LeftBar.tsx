import { Drawer } from "@mui/material";
import React, { useRef, useEffect, ReactNode } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { route } from "../../Constants/Routes/routesName";
import { sessionHelper } from "../../Helper/sessionHelper";
import "./LeftBar.scss";

interface Props {
  open: boolean;
  setOpen: (status: boolean) => void;
}

interface navigator {
  icon: ReactNode;
  name: string;
  to: () => void;
}

export const LeftBar: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const history = useHistory();
  const DrawerRef = useRef<any>();
  const handleClickOutside = (event: any) => {
    if (DrawerRef.current && !DrawerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [DrawerRef]);

  const navigator: navigator[] = [
    {
      icon: <i className="bi bi-house drawer-icon"></i>,
      name: "Trang chủ",
      to: () => history.push(route.HOME),
    },
    {
      icon: <i className="bi bi-receipt drawer-icon"></i>,
      name: "Đơn hàng",
      to: () => history.push(route.ORDER),
    },
    {
      icon: <i className="bi bi-people drawer-icon"></i>,
      name: "Nhân viên",
      to: () => history.push(route.EMPLOYEE),
    },
    {
      icon: <i className="bi bi-bar-chart drawer-icon"></i>,
      name: "Thống kê",
      to: () => history.push(route.STATIC),
    },
    {
      icon: <i className="bi bi-box-arrow-left drawer-icon"></i>,
      name: "Đăng xuất",
      to: () => {
        sessionHelper.removeAll();
        window.location.reload();
      },
    },
  ];

  return (
    <div ref={DrawerRef}>
      <Drawer anchor="left" open={open}>
        <div className="drawer-container">
          <h3 className="text-center py-3 text-white">ADMIN</h3>
          <ListGroup>
            {navigator.map((item, index) => {
              return (
                <ListGroupItem
                  action
                  onClick={() => item.to()}
                  className="d-flex flex-column align-items-center"
                  key={index}
                >
                  {item.icon}
                  <p className="mb-0 mt-1">{item.name}</p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </Drawer>
    </div>
  );
};
