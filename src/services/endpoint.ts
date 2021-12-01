export const endpoint = {
  orders: {
    getAllOrders: "orders/get_all_orders.php",
    getOneOrder: (id: number) => `orders/get_one_order.php?order_id=${id}`,
    create: "orders/create.php",
    update: "orders/update.php",
    delete: "orders/delete.php",
  },
  employee: {
    bestSeller: "/employee/best_seller.php",
    details: (id: number) => `/employee/employee_details.php?employee_id=${id}`,
    auth: {
      login: "/employee/auth/login.php",
    },
  },
  orderProducts: {
    totalProductSold: "orderProducts/get_total.php",
  },
  products: {
    getAll: "products/get_all.php",
    topSeller: "products/top_seller.php",
  },
};
