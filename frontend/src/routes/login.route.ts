import { LoginPage } from "@/pages/auth/LoginPage";
import { RouteObject } from "react-router";

export const AuthLoginRoute: RouteObject = {
    path: '/auth/login',
    children: [
        {
            index: true,
            Component: LoginPage
        }
    ]
}