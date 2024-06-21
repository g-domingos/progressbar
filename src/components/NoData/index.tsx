import { Flex, Text } from "@chakra-ui/react";
import { CiCloudOff } from "react-icons/ci";

export const NoData = () => {
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      opacity={"0.7"}
    >
      <CiCloudOff size={40} />
      <Text>Não há dados a serem mostrados</Text>
    </Flex>
  );
};
