import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { Sidebar } from "../../components/Sidebar";
import { Flex } from "@chakra-ui/react";

export const DefaultLayout = () => {
  const location = useLocation();

  const { pathname } = location;

  const showSidebar = pathname.includes("admin");
  return (
    <div>
      <NavBar />
      <Flex>
        {showSidebar && <Sidebar />}
        <Outlet />
      </Flex>
    </div>
  );
};
