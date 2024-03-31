import { Text, Flex } from "@chakra-ui/react";

interface IGenericPage {
  title: string;
  children: React.ReactNode;
}
export const GenericPage = ({ title, children }: IGenericPage) => {
  return (
    <Flex
      flexDirection={"column"}
      padding="0.2rem 0.2rem 0.3rem 1.5rem"
      w={"100%"}
      height={"90vh"}
      fontFamily={"Quicksand"}
      css={{
        "div::-webkit-scrollbar": {
          width: "4px",
        },
        "div::-webkit-scrollbar-track": {
          width: "6px",
        },
        "div::-webkit-scrollbar-thumb": {
          background: "black",
          borderRadius: "24px",
        },
      }}
    >
      <Text fontWeight={600} fontSize={23}>
        {title}
      </Text>
      <Flex width={"100%"} height={"92%"}>
        {children}
      </Flex>
    </Flex>
  );
};
