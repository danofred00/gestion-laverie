import { ReservationsPage } from "@/pages/reservations/reservations-page";
import { RouteObject } from "react-router";

export const reservationRoute: RouteObject = {
    path: "/reservations",
    children: [
        {
            index: true,
            Component: ReservationsPage
        }
    ]
}