import { sessionHelper } from "../../Helper/sessionHelper";
import { Login } from "../../Pages/Auth/Login";
import { Employee } from "../../Pages/Employee/Employee";
import { Home } from "../../Pages/Home/Home";
import { OrderDetails } from "../../Pages/Orders/Details/OrderDetails";
import { Order } from "../../Pages/Orders/Order";
import { TheNumbers } from "../../Pages/Static/TheNumbers";
import { iRoute, route } from "./routesName";

const routes: iRoute[] = [
  {
    path: route.HOME,
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: route.ORDER,
    name: "order",
    exact: true,
    component: Order,
  },
  {
    path: route.ORDER_DETAILS,
    name: "order",
    exact: true,
    component: OrderDetails,
  },
  {
    path: route.EMPLOYEE,
    name: "employee",
    exact: true,
    component: Employee,
  },
  {
    path: route.STATIC,
    name: "static",
    exact: true,
    component: TheNumbers,
  },
];

const authRoute: iRoute[] = [
  {
    path: route.LOGIN,
    name: "login",
    exact: true,
    component: Login,
  },
];

export const finalRoutes = () => {
  const session = sessionHelper.getItem("username");
  if (!session) {
    return authRoute;
  } else {
    return [...routes];
  }
};
export default routes;
