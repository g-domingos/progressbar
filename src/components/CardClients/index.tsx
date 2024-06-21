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
  manager?: string;
}

export const CardClients = ({ id, status, title, color, manager }: ICardClients) => {
  const handleOpenDash = () => {
    window.open("/clients/dashboard/" + id, "_blank");
  };

  const handleOpenTaskSettings = () => {
    window.open("/admin/task-settings/" + id, "_blank");
  };

  return (
    <Flex
      border="1px solid lightgray"
      width={"17rem"}
      maxH={"10.4rem"}
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
        justifyContent={"space-between"}
        borderRadius={"6px"}
        alignItems={"center"}
        width={"100%"}
        mb="0.3rem"
      >

        <Flex h={"3.5rem"} overflow={"hidden"} alignItems={"flex-start"} w="100%">
          <Text fontWeight={700} fontSize={16} width={"100%"} >
            {title}
          </Text>
        </Flex>
        <Flex w={"100%"} flexDirection={"column"} css={{ "p": { "marginBottom": "unset" } }} alignItems={"flex-start"}>
          <Text fontSize={"12px"}>Gerente:</Text>
          <Text>{manager || " - "}</Text>
        </Flex>
        {/* <Text>{status}</Text> */}
      </Flex>
      <Flex
        flex={1}
        background={colors.yellow}
        borderRadius={"20px"}
        width={"90%"}
        justifyContent={"space-around"}
        css={{
          button: {
            height: "25px",
            minWidth: "unset",
            width: "25px",
            borderRadius: "100%",
            padding: "unset",
            ":hover": { background: "white", borderRadius: "100%" },
          },
        }}
        padding="6px"

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
