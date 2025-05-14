import { VehiclesPage } from "@/pages/vehicules/VehiclesPage";
import { RouteObject } from "react-router";

export const vehiculeRoute: RouteObject = {
    path: '/vehicules',
    children: [
        {
            index: true,
            Component: VehiclesPage
        }
    ]
}