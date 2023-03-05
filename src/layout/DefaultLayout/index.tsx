import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

export const DefaultLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
