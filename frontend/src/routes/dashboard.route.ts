import Dashboard  from "@/pages/dashboard/dashboard";
import { RouteObject } from "react-router";

export const dashboardRoute: RouteObject = {
    path: '/dashboard',
    children: [
        {
            index: true,
            Component: Dashboard
        }
    ]
}