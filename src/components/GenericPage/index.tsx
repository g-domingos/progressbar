import { Text, Flex } from "@chakra-ui/react";

interface IGenericPage {
  title: string;
  children: React.ReactNode;
}
export const GenericPage = ({ title, children }: IGenericPage) => {
  return (
    <Flex flexDirection={"column"} padding="0.5rem 0.5rem 0.5rem 1.5rem" w={"100%"} height={"80vh"}>
      <Text fontWeight={600} fontSize={23}>
        {title}
      </Text>
      <Flex width={"100%"} height={"100%"}>
        {children}
      </Flex>
    </Flex>
  );
};
