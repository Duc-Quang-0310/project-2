import { Home } from "../../Pages/Home/Home";
import { OrderDetails } from "../../Pages/Orders/Details/OrderDetails";
import { Order } from "../../Pages/Orders/Order";
import { iRoute, route } from "./routesName";

const routes: iRoute[] = [
  {
      path: route.HOME ,
      name: "home",
      exact: true,
      component: Home
  },
  {
    path: route.ORDER ,
    name: "order",
    exact: true,
    component: Order
  },
  {
    path: route.ORDER_DETAILS ,
    name: "order",
    exact: true,
    component: OrderDetails
  },
]

export default routes
