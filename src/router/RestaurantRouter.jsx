import { Navigate } from "react-router-dom";
import CoursePage from "../restaurant/pages/CoursePage";
import CoursesPage from "../restaurant/pages/CoursesPage";
import IngredientPage from "../restaurant/pages/IngredientPage";
import IngredientsPage from "../restaurant/pages/IngredientsPage";
import PostReviewsPage from "../restaurant/pages/PostReviewsPage";
import TrayPage from "../restaurant/pages/TrayPage";
import TraysPage from "../restaurant/pages/TraysPage";

export const childRestaurantRoutes = [
  { path: "trays", 
  element: <TraysPage /> 
  },
  { path: "trays/:id", 
  element: <TrayPage /> 
  },
  {
    path: "ingredients/:id",
    element: <IngredientPage />,
  },
  {
    path: "ingredients",
    element: <IngredientsPage />,
  },
  {
    path: "courses/:id",
    element: <CoursePage />,
  },
  {
    path: "courses",
    element: <CoursesPage />,
  },
  {
    path: "reviews",
    element: <PostReviewsPage />,
  },
  {
    path: "/*",
    element: <Navigate to={"/trays"} />,
  },
];