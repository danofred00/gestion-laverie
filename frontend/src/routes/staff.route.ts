import { StaffPage } from "@/pages/staff/StaffPage";
import { RouteObject } from "react-router";

export const staffRoute: RouteObject = {
    path: '/staff',
    children: [
        {
            index: true,
            Component: StaffPage
        }
    ]
}