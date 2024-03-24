import { Text, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { colors } from "../../styles/theme";
import { ReactNode } from "react";

interface IExpandableItem {
  title: string;
  children: React.ReactNode;
}

export const ExpandableItem = ({ title, children }: IExpandableItem) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex w={"100%"} flexDirection={"column"}>
      <Flex
        w={"100%"}
        alignItems={"center"}
        padding="0.5rem"
        borderRadius={"0.5rem"}
        boxShadow={"0 0 15px lightgray"}
        justifyContent={"space-between"}
      >
        <Text mb="unset" fontWeight={600}>{title}</Text>
        <Button
          padding={"10px"}
          fontSize={11}
          background={colors.gray}
          onClick={onToggle}
        >
          {isOpen ? "FECHAR" : "ABRIR"}
        </Button>
      </Flex>
      {isOpen ? <Flex>{children}</Flex> : null}
    </Flex>
  );
};
