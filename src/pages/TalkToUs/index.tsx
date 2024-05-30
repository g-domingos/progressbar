import { Text, Flex } from "@chakra-ui/react";
import { GenericPage } from "../../components/GenericPage";

export const TalkToUs = () => {
  return (
    <GenericPage title={"Fale Conosco"} >
      <Flex
        borderLeft={"1px solid lightgray"}
        flex={"1"}
        flexDirection={"column"}
        paddingLeft="10px"
      >
        <Text fontWeight={500}>
          Precisa falar <strong>conosco?</strong>
        </Text>
        <Flex
          flexDirection={"column"}
          css={{
            p: {
              marginBottom: "unset",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "10px",
              transition: "0.2s ease-in-out",

              ":hover": {
                cursor: "pointer",
                background: "lightgray",
              },
            },
          }}
        >
          <Text>Indique & Ganhe</Text>
          <Text>Deixe um feedback para nós</Text>
          <Text>Financeiro / Contrato</Text>
          <Text>Comercial</Text>
        </Flex>
        <Text fontWeight={500} mt="1rem">
          Conteúdos <strong>para você</strong>
        </Text>
        <Flex
          flexDirection={"column"}
          css={{
            p: {
              marginBottom: "unset",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "10px",
              transition: "0.2s ease-in-out",

              ":hover": {
                cursor: "pointer",
                background: "lightgray",
              },
            },
          }}
        >
          <Text>Blog Link 1</Text>
          <Text>Blog Link 2</Text>
          <Text>Blog Link 3</Text>
          <Text>Blog Link 4</Text>
        </Flex>
      </Flex>
    </GenericPage>
  );
};
