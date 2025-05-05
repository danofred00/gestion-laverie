import { RouteObject } from "react-router";
import CustomerPage from "./pages";

export const customerRoute: RouteObject = {
    path: '/customers',
    Component: CustomerPage
}