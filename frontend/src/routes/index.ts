import { createBrowserRouter,  redirect,Outlet } from "react-router";
import Root from "../pages/Root";
import  Dashboard  from '../pages/Dashboard'
import { Layout } from '../components/Layout'

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
        path: "/root",
        Component: Root
    },
    {
        path: '/',
        Component: Layout ,
        // loader: requireAuth,
        children: [
          { index: true, Component: Dashboard  },
          { path: 'dashboard', Component: Dashboard  },      
        ],
      },
      {
        path: '*',
        loader: () => redirect('/'),
      },
]);

export default router