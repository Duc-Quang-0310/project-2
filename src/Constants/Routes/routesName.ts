export const route = {
    HOME: "/home",
    ORDER: "/orders"
}

export interface iRoute {
    path: string,
    name: string,
    exact: boolean,
    component: any,
    props?: any,
}