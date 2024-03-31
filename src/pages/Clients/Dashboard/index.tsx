import { Flex, Input, Text } from "@chakra-ui/react";
import { GenericPage } from "../../../components/GenericPage";
import { ICardDetail, SummaryCard } from "../../../components/SummaryCard";
import { Tag } from "../../../components/Tag";
import { colors } from "../../../styles/theme";
import { PieChart } from "../../../components/PieChart";
import { LineChart } from "../../../components/LineChart";

const beforeMock: any = [
  {
    document: "10.081.944/0001-94",
    data: [
      {
        name: "Mercado Livre",
        value: 40000.0,
        color: colors.mercadolivre,
      },
      { name: "Shopee", value: 40000.0, color: colors.shopee },
      {
        name: "Magalu",
        value: 40000.0,
        color: colors.magalu,
      },
    ],
  },
  {
    document: "72.739.818/0001-31",
    data: [
      { name: "Shopee", value: 40000.0, color: colors.shopee },
      {
        name: "Mercado Livre",
        value: 40000.0,
        color: colors.mercadolivre,
      },
      {
        name: "Magalu",
        value: 40000.0,
        color: colors.magalu,
      },
    ],
  },
  {
    document: "72.739.818/0001-31",
    data: [
      {
        name: "Mercado Livre",
        value: 40000.23,
        color: colors.mercadolivre,
      },
      {
        name: "Magalu",
        value: 40000.23,
        color: colors.magalu,
      },
      { name: "Shopee", value: 10000.22, color: colors.shopee },
    ],
  },
];

export const Dashboard = () => {
  return (
    <GenericPage title={"Dashboard"}>
      <Flex width={"100%"} fontSize={14} flexDirection={"column"}>
        <Flex height={"60%"} w="100%">
          <Flex
            flex={"1"}
            flexDirection={"column"}
            borderRight={"1px solid lightgray"}
            height={"100%"}
          >
            <Flex flexDirection={"column"}>
              <Text fontWeight={500}>
                Cenário <strong>antes</strong> da <strong>Integracomm</strong>
              </Text>

              <Flex gap="0.5rem" mb="0.5rem">
                <Text marginBottom={"unset"}>Sistema: </Text>
                <Tag text={"Bling"} color="white" background={colors.bling} />
              </Flex>
            </Flex>
            <Flex flexDirection={"column"} gap="1.3rem" overflow={"auto"}>
              {beforeMock?.map(
                (cnpj: { document: string; data: ICardDetail[] }) => (
                  <Flex
                    border={"1px solid lightgray"}
                    padding={"20px"}
                    borderRadius={"10px"}
                  >
                    <SummaryCard data={cnpj.data} document={cnpj.document} />
                  </Flex>
                )
              )}
            </Flex>
          </Flex>
          <Flex
            width={"50%"}
            paddingLeft={"10px"}
            flexDirection={"column"}
            gap="0.2rem"
          >
            <Text>
              Cenário <strong>com</strong> a{" "}
              <strong style={{ fontSize: 14 }}>Integracomm</strong>
            </Text>
            {/* <Flex gap="0.4rem">
              <Text mb="unset">Período: </Text>
              <Input type="date" width={"20%"} height={"unset"} />
            </Flex> */}
            <Flex gap="0.5rem">
              <Text marginBottom={"unset"}>Sistema: </Text>
              <Tag text={"Bling"} color="white" background={colors.bling} />
              <Tag text={"Ideri's"} color="white" background={colors.ideris} />
            </Flex>

            <Flex flexDirection={"row"} overflow={"auto"}>
              <Flex flexDirection={"column"} gap="0.7rem" w="100%">
                {beforeMock?.map(
                  (cnpj: { document: string; data: ICardDetail[] }) => (
                    <Flex
                      flexDirection={"row"}
                      w={"100%"}
                      height={"13rem"}
                      border={"1px solid lightgray"}
                      padding={"20px"}
                      borderRadius={"10px"}
                    >
                      <Flex width={"50%"}>
                        <SummaryCard
                          data={cnpj.data}
                          document={cnpj.document}
                        />
                      </Flex>
                      <Flex display={"block !important"}>
                        <PieChart data={cnpj.data} />
                      </Flex>
                      <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        css={{ p: { marginBottom: "unset", fontWeight: 700 } }}
                      >
                        <Text>Total</Text>
                        <Text>R$40.000,00</Text>
                      </Flex>
                    </Flex>
                  )
                )}
              </Flex>
            </Flex>
          </Flex>
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
        </Flex>
        <Flex
          borderTop={"1px solid lightgray"}
          flex={1}
          width={"100%"}
          padding="2px"
          flexDirection={"column"}
          alignItems={"center"}
          height={"40%"}
        >
          <Text fontWeight={700}>Como está suas vendas?</Text>
          <Flex
            w={"90%"}
            height={"80%"}
          >
            <LineChart />
          </Flex>
        </Flex>
      </Flex>
    </GenericPage>
  );
};
