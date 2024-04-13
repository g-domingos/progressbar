import { Outlet, useLocation, useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";

export const DefaultLayout = () => {
  const location = useLocation();
  const params = useParams();

  const { pathname } = location;

  const isAdmin = pathname.includes("admin");

  const clientId = params?.id;

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <NavBar />
      <Flex height={"100%"}>
        <Sidebar isAdmin={isAdmin} clientId={clientId} />
        <Outlet />
      </Flex>
    </Flex>
  );
};
