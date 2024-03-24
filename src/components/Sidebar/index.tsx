import { Flex } from "@chakra-ui/react";
import { NavItem } from "../NavItem";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { colors } from "../../styles/theme";
import { FaUsers } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <Flex
      width="15rem"
      background={colors.yellow}
      height={"90vh"}
      padding={"1rem 0 1rem 1rem"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"} gap="1rem">
        <NavItem name={"Início"} link={"/backoffice/admin"} icon={<MdHome />} />
        <NavItem name={"Clientes"} link={"/admin/clients"} icon={<FaUsers />} />
      </Flex>
      <Flex>
        <NavItem
          name={"Configurações"}
          link={"/admin/settings"}
          icon={<IoSettingsOutline />}
        />
      </Flex>
    </Flex>
  );
};
