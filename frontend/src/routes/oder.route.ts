import { OrdersPage } from "@/pages/orders/orders-page";
import { RouteObject } from "react-router";

export const orderRoute: RouteObject = {
    path: '/orders',
    children: [
        {
            index: true,
            Component: OrdersPage
        }
    ]
}