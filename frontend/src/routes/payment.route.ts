import { PaymentsPage } from "@/pages/payments/payments-page"
import { RouteObject } from "react-router"

export const paymentRoute: RouteObject  = {
    path: "/payments",
    children: [
        { 
            index: true,
            Component: PaymentsPage
        }
    ]
}