import { accountTypes } from "../Pages/Auth/Login";
import { baseURL } from "./baseURL";
import { endpoint } from "./endpoint";

export interface orderCreation {
  client_name: string;
  employee_ID: number | undefined;
  status: "pending" | "done" | "cancel" | "";
  address: string;
  order_product_id: number | undefined;
  product_id: number | undefined;
  quantity: number | undefined;
}

export interface orderUpdateType {
  order_id: number;
  client_image: string;
  client_name: string;
  employee_ID: number;
  status: "pending" | "done" | "cancel" | "";
  address: string;
  product_id: number;
  quantity: number;
}

const send = (method: any, url: any, data?: any) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

export const xmlService = {
  login: async (account: accountTypes) => {
    const response: any = await send(
      "POST",
      baseURL + endpoint.employee.auth.login,
      account
    );
    return response;
  },
  bestSeller: async () => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.employee.bestSeller
    );
    return response;
  },
  totalProductSold: async () => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.orderProducts.totalProductSold
    );
    return response;
  },
  getAllOrders: async () => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.orders.getAllOrders
    );
    return response;
  },
  getOneOrder: async (id: number) => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.orders.getOneOrder(id)
    );
    return response;
  },
  getEmployee: async (id: number) => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.employee.details(id)
    );
    return response;
  },
  createOrder: async (params: orderCreation) => {
    const response: any = await send(
      "POST",
      baseURL + endpoint.orders.create,
      params
    );
    return response;
  },
  updateOrder: async (params: any) => {
    const response: any = await send(
      "PUT",
      baseURL + endpoint.orders.update,
      params
    );
    return response;
  },
  deleteOrder: async (id: number) => {
    const response: any = await send(
      "DELETE",
      baseURL + endpoint.orders.delete,
      { id }
    );
    return response;
  },
  getAllProduct: async () => {
    const response: any = await send("GET", baseURL + endpoint.products.getAll);
    return response;
  },
  getTopSeller: async () => {
    const response: any = await send(
      "GET",
      baseURL + endpoint.products.topSeller
    );
    return response;
  },
};
