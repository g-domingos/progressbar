import { Text, Flex, Button, Tooltip } from "@chakra-ui/react";
import { IoMdOpen } from "react-icons/io";
import colors from "../../styles/theme";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ICardClients {
  title: string;
  id: string;
  color?: string;
  status: string;
  manager?: string;
  users?: any[];
}

export const CardClients = ({
  id,
  status,
  title,
  color,
  manager,
  users,
}: ICardClients) => {
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
        <Flex
          h={"3.5rem"}
          overflow={"hidden"}
          alignItems={"flex-start"}
          w="100%"
          position={"relative"}
        >
          <Text
            fontWeight={700}
            fontSize={16}
            width={"100%"}
          >
            {title}
          </Text>
          {users?.length ? null : (
            <Tooltip
              label="Ainda não há usuários cadastrados"
              bg="black"
            >
              <Flex
                position="absolute"
                right={"0"}
                w="10px"
                h="10px"
                bg="red"
                borderRadius={"100%"}
              ></Flex>
            </Tooltip>
          )}
        </Flex>
        <Flex
          w={"100%"}
          flexDirection={"column"}
          css={{ p: { marginBottom: "unset" } }}
          alignItems={"flex-start"}
        >
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
            svg: {
              color: "black",
            },
          },
        }}
        padding="6px"
      >
        <Link to={"/admin/task-settings/" + id}>
          <Button>
            <IoSettingsOutline />
          </Button>
        </Link>
        <Link to={"/clients/dashboard/" + id}>
          <Button>
            <IoMdOpen />
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
