import { createBrowserRouter } from "react-router";
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout";
import Dashboard from "@/pages/dashboard/dashboard";
import { paymentRoute } from "./payment.route";
import { clientRoute } from "./client.route";
import { reviewRoute } from "./review.route";
import { orderRoute } from "./oder.route";
import { dashboardRoute } from "./dashboard.route";
import { reservationRoute } from "./reservation.route";
// import { AuthLoginRoute } from "./login.route";
import { serviceRoute } from "./service.route";
import { inventoryRoute } from "./inventory.route";
import { subscriptionRoute } from "./subscription.route";
import { vehiculeRoute } from "./vehicule.route";
import { staffRoute } from "./staff.route";
import { LoginPage } from "@/pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthenticatedLayout,
    children: [
      { index: true, Component: Dashboard },

      clientRoute,
      paymentRoute,
      reservationRoute,
      orderRoute,
      dashboardRoute,
      reviewRoute,
      serviceRoute,
       subscriptionRoute,
      vehiculeRoute,
      staffRoute,
      inventoryRoute,
    ],
  },
  {
      path: '/auth/login',
      children: [
          {
              index: true,
              Component: LoginPage
          }
      ]
  }
]);

export default router;
