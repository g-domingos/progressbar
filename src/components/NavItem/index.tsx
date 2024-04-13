import { Flex, Link } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

interface INavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const NavItem = ({ link, name, icon }: INavItem) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const handleClick = () => {
    navigate(link);
  };

  const isSelected = pathname === link;
  return (
    <Flex
      onClick={handleClick}
      background={isSelected ? "white" : "transparent"}
      padding="10px"
      alignItems={"center"}
      gap="0.5rem"
      borderRadius={"0.9rem 0 0 0.9rem"}
      fontWeight={600}
      textTransform={"uppercase"}
      height={"3rem"}
      width={"100%"}
      transition={"0.2s ease-in-out"}
      fontSize={12}
      _hover={{
        cursor: "pointer",
        background: "#fbfb47",
        label: { cursor: "pointer" },
      }}
    >
      {icon}
      <label>{name}</label>
    </Flex>
  );
};
