import { Text, Flex, Spinner } from "@chakra-ui/react";

interface IGenericPage {
  title: string;
  children: React.ReactNode;
  action?: any;
  processing?: boolean;
}
export const GenericPage = ({
  processing,
  title,
  children,
  action,
}: IGenericPage) => {
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
      <Flex gap="1rem" alignItems={"center"}>
        <Text fontWeight={600} fontSize={23} mb="unset">
          {title}
        </Text>
        {processing ? <Spinner /> : null}
        {action ? action : null}
      </Flex>
      <Flex width={"100%"} height={"92%"} padding="0 10px 0 0">
        {children}
      </Flex>
    </Flex>
  );
};
