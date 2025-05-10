import { createBrowserRouter } from "react-router";
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout";
import Dashboard from "@/pages/dashboard";
import { paymentRoute } from "./payment.route";
import { clientRoute } from "./client.route";
import { reservationRoute } from "./reservation.route";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthenticatedLayout,
    children: [
      { index: true, Component: Dashboard },
      clientRoute,
      paymentRoute,
      reservationRoute
    ],
  },
]);

export default router;
