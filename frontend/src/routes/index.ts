import { createBrowserRouter, redirect } from "react-router";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import { ReservationsPage } from "../pages/ReservationsPage";
import { PaymentsPage } from "../pages/PaymentsPage";
import { ClientsPage } from "../pages/ClientsPage";
import { Layout } from "../components/Layout";

// loader qui vérifie l'authentification
// async function requireAuth() {
//     const isAuthenticated = localStorage.getItem('authToken') !== null
//     if (!isAuthenticated) {
//       // redirige vers /login si pas connecté
//       throw redirect('/login')
//     }
//     return null
//   }

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    // loader: requireAuth,
    children: [
      { index: true, Component: Dashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "reservations", Component: ReservationsPage },
      { path: "payments", Component: PaymentsPage },
      { path: "clients", Component: ClientsPage },
    ],
  },
]);

export default router;
