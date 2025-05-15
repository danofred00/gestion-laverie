import { InventoryPage } from "@/pages/inventory/InventoryPage";
import { RouteObject } from "react-router";

export const inventoryRoute: RouteObject = {
    path: '/inventory',
    children: [
        {
            index: true,
            Component: InventoryPage
        }
    ]
}