import { Box, Flex, Link } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

interface INavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
  blocked?: boolean;
}

export const NavItem = ({ link, name, icon, blocked }: INavItem) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const handleClick = () => {
    if (blocked) {
      return;
    }

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
      opacity={blocked ? "0.5" : "1"}
      cursor={blocked ? "not-allowed" : "pointer"}
    >
      {icon}
      <label>{name}</label>
      {blocked && (
        <Box>
          <FaLock />
        </Box>
      )}
    </Flex>
  );
};
