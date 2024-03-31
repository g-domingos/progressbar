import { Flex } from "@chakra-ui/react";
import { NavItem } from "../NavItem";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { colors } from "../../styles/theme";
import { FaUsers } from "react-icons/fa";

interface ISidebar {
  isAdmin?: boolean;
  clientId?: string;
}

export const Sidebar = ({ isAdmin, clientId }: ISidebar) => {
  const isAuthorized = localStorage.getItem("isAuthorized") === "true";

  if (!isAuthorized) {
    return <></>;
  }

  return (
    <Flex
      width="15rem"
      background={colors.yellow}
      height={"90vh"}
      padding={"1rem 0 1rem 1rem"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {isAdmin ? (
        <>
          <Flex flexDirection={"column"} gap="1rem">
            <NavItem
              name={"Início"}
              link={"/backoffice/admin"}
              icon={<MdHome />}
            />
            <NavItem
              name={"Clientes"}
              link={"/admin/clients"}
              icon={<FaUsers />}
            />
          </Flex>
          <Flex>
            <NavItem
              name={"Configurações"}
              link={"/admin/settings"}
              icon={<IoSettingsOutline />}
            />
          </Flex>
        </>
      ) : (
        <>
          <Flex flexDirection={"column"} gap="1rem">
            <NavItem
              name={"Dashboard"}
              link={`/clients/dashboard/${clientId}`}
              icon={<MdHome />}
            />
            <NavItem
              name={"Progresso"}
              link={`/clients/progress/${clientId}`}
              icon={<FaUsers />}
            />
            <NavItem
              name={"Atendimento"}
              link={`/clients/messages/${clientId}`}
              icon={<FaUsers />}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
