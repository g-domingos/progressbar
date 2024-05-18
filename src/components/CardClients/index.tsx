import { Text, Flex, Button, Tooltip } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import colors from "../../styles/theme";
import { useNavigate } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";

interface ICardClients {
  title: string;
  id: string;
  color?: string;
  status: string;
}

export const CardClients = ({ id, status, title, color }: ICardClients) => {
  const handleOpenDash = () => {
    window.open("/clients/dashboard/" + id, "_blank");
  };

  const handleOpenTaskSettings = () => {
    window.open("/admin/task-settings/" + id, "_blank");
  };

  return (
    <Flex
      border="1px solid lightgray"
      width={"200px"}
      height={"200px"}
      borderRadius={"15px"}
      padding={"14px"}
      flexDirection={"column"}
      transition={"0.2s ease-in-out"}
      justifyContent={"space-between"}
      alignItems={"center"}
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer",
      }}
    >
      <Flex
        flexDirection={"column"}
        height={"90%"}
        justifyContent={"space-between"}
        borderRadius={"6px"}
        alignItems={"center"}
      >
        <Text fontWeight={700} fontSize={18}>
          {title}
        </Text>
        <Text>{status}</Text>
      </Flex>
      <Flex
        flex={1}
        background={colors.yellow}
        borderRadius={"20px"}
        width={"90%"}
        justifyContent={"space-around"}
        css={{
          button: {
            borderRadius: "100%",
            ":hover": { background: "white", borderRadius: "100%" },
          },
        }}
      >
        <Button onClick={handleOpenTaskSettings}>
          <IoSettingsOutline />
        </Button>
        <Button onClick={handleOpenDash}>
          <IoMdOpen />
        </Button>
      </Flex>
    </Flex>
  );
};
