import { ClientsPage } from "@/pages/clients/client-page";
import { RouteObject } from "react-router";

export const clientRoute: RouteObject = {
    path: '/clients',
    children: [
        {
            index: true,
            Component: ClientsPage
        }
    ]
}