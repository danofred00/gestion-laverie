import { ReviewsPage } from "@/pages/reviews/Reviews-page";
import { RouteObject } from "react-router";

export const reviewRoute: RouteObject = {
    path: '/reviews',
    children: [
        {
            index: true,
            Component: ReviewsPage
        }
    ]
}