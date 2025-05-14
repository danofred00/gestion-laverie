import { SubscriptionsPage } from "@/pages/subscriptions/SubscriptionsPage";
import { RouteObject } from "react-router";

export const subscriptionRoute: RouteObject = {
    path: '/subscriptions',
    children: [
        {
            index: true,
            Component: SubscriptionsPage
        }
    ]
}