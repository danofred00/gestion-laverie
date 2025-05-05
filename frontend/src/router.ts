import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout";
import { customerRoute } from "@/features/customers/routes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [customerRoute],
  },
]);

export default router;
