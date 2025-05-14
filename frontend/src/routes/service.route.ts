import { ServicesPage } from "@/pages/services/ServicesPage";
import { RouteObject } from "react-router";

export const serviceRoute: RouteObject = {
    path: '/services',
    children: [
        {
            index: true,
            Component: ServicesPage
        }
    ]
}