import { Outlet } from "react-router-dom";
import { NavBar } from "../../ui/components/NavBar";

export const RestaurantRoutes = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};