import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root
    }
]);

export default router