import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../auth";
import { ErrorPage, RestaurantRoutes } from "../restaurant";
import { childRestaurantRoutes, PrivateRoute, PublicRoute } from "./";

const routesConfig = createBrowserRouter([
  {
    path: "login/*",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/*",
    element: (
      <PrivateRoute>
        <RestaurantRoutes />
      </PrivateRoute>
    ),
    children: childRestaurantRoutes,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routesConfig} />;
};