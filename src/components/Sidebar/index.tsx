import { Button, Flex } from "@chakra-ui/react";
import { NavItem } from "../NavItem";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { colors } from "../../styles/theme";
import { FaUsers } from "react-icons/fa";
import { signOut } from "@aws-amplify/auth";
import { useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";

interface ISidebar {
  isAdmin?: boolean;
  clientId?: string;
}

export const Sidebar = ({ isAdmin, clientId }: ISidebar) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Flex
      width="15rem"
      background={colors.yellow}
      padding={"1rem 0 1rem 1rem"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {isAdmin ? (
        <>
          <Flex flexDirection={"column"} gap="0.2rem">
            <NavItem name={"Início"} link={"/admin"} icon={<MdHome />} />
            <NavItem
              name={"Clientes"}
              link={"/admin/clients"}
              icon={<FaUsers />}
            />
          </Flex>
          <Flex flexDirection={"column"}>
            <NavItem
              name={"Configurações"}
              link={"/admin/settings"}
              icon={<IoSettingsOutline />}
            />
            <Button
              fontSize={12}
              onClick={handleLogOut}
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-start"}
              gap="0.5rem"
              padding={"10px"}
            >
              <CiLogout />
              SAIR
            </Button>
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
          <Flex>
            <Button
              fontSize={12}
              onClick={handleLogOut}
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-start"}
              gap="0.5rem"
              padding={"10px"}
            >
              <CiLogout />
              SAIR
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};
