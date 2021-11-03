export const route = {
    HOME: "/home",
    ORDER: "/orders",
    ORDER_DETAILS: "/orders/:params"
}

export interface iRoute {
    path: string,
    name: string,
    exact: boolean,
    component: any,
    props?: any,
}