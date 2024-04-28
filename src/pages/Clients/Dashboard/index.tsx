import { Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { GenericPage } from "../../../components/GenericPage";
import { ICardDetail, SummaryCard } from "../../../components/SummaryCard";
import { Tag } from "../../../components/Tag";
import { colors } from "../../../styles/theme";
import { PieChart } from "../../../components/PieChart";
import { LineChart } from "../../../components/LineChart";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import { IInfo } from "../../../components/CnpjForm";
import { CiCloudOff } from "react-icons/ci";
import { StackedLineChart } from "../../../components/StackedLineChart";

const beforeMock: any = [
  {
    document: "10.081.944/0001-94",
    data: [
      {
        name: "Mercado Livre",
        value: 120000.0,
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
];

export const Dashboard = () => {
  const params = useParams();

  const [cnpjs, setCnpjs] = useState<IInfo[]>([]);

  const [summarybyCnpj, setSummaryByCnpj] = useState<any>([]);

  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const fetchGeneralInfoByTask = () => {
    request({ method: "get", pathParameters: "/info" }).then(
      (response: IInfo[]) => {
        const sorted = response.sort((a: IInfo, b: IInfo) => a.id - b.id);
        setCnpjs(sorted);
      }
    );
  };

  const fetchSummaryByCNPJ = ({ cnpjId }: { cnpjId: string }) => {
    request({ method: "get", pathParameters: `/sales-summary/${cnpjId}` }).then(
      (response) => {
        setSummaryByCnpj([...summarybyCnpj, response]);
      }
    );
  };

  useEffect(() => {
    if (!processing) {
      fetchGeneralInfoByTask();
    }
  }, []);

  useEffect(() => {
    if (!cnpjs?.length || processing) return;

    cnpjs.map((item: IInfo) => {
      fetchSummaryByCNPJ({ cnpjId: String(item.id) });
    });
  }, [cnpjs]);

  const gridTemplateColumns = "0.8fr 3fr";

  return (
    <GenericPage title={"Dashboard"}>
      <Flex width={"100%"} fontSize={14} flexDirection={"column"}>
        <Flex
          width={"100%"}
          display={"grid"}
          gridTemplateColumns={gridTemplateColumns}
          gap="1rem"
          padding={"1rem 0"}
          css={{ p: { marginBottom: "unset" } }}
        >
          <Flex>
            <Text fontWeight={500}>
              Cenário <strong>antes</strong> da <strong>Integracomm</strong>
            </Text>
          </Flex>
          <Flex>
            <Text>
              Cenário <strong>com</strong> a{" "}
              <strong style={{ fontSize: 14 }}>Integracomm</strong>
            </Text>
          </Flex>
        </Flex>
        <Flex
          width={"100%"}
          maxH={"100%"}
          overflowY={"auto"}
          flexDirection={"column"}
        >
          {processing ? (
            <Flex
              w="100%"
              height={"10rem"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner />
            </Flex>
          ) : !summarybyCnpj.length ? (
            <Flex
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              flexDirection={"column"}
              opacity={"0.5"}
              justifyContent={"center"}
            >
              <CiCloudOff size={30} />
            </Flex>
          ) : (
            summarybyCnpj?.map((item: any, index: number) => (
              <Flex
                borderBottom="1px solid lightgray"
                display={"grid"}
                padding="1rem 0"
                gap="1rem"
                gridTemplateColumns={gridTemplateColumns}
                key={index}
              >
                <Flex className="Antes" borderRight={"1px solid lightgray"}>
                  <Flex transform={"scale(0.90)"}>
                    <SummaryCard
                      key={index}
                      data={item?.currentCnpj?.data}
                      document={item?.currentCnpj?.document}
                      hideActions
                    />
                  </Flex>
                </Flex>
                <Flex className="Depois" maxH={"14rem"}>
                  <Flex width={"40%"} justifyContent={"space-between"}>
                    <SummaryCard
                      key={index}
                      data={item?.summaryData}
                      document={item?.currentCnpj?.document}
                      hideActions
                    />
                    <PieChart data={item?.summaryData} />
                  </Flex>
                  <Flex flex={1}>
                    <StackedLineChart
                      data={item?.lineChart}
                      colors={item?.colorsByMarketPlace}
                    />
                  </Flex>
                </Flex>
              </Flex>
            ))
          )}
        </Flex>
        {/* <Flex
            flex={"1"}
            flexDirection={"column"}
            borderRight={"1px solid lightgray"}
            height={"100%"}
            border="1px solid blue"
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
            <Flex
              className="cardContainers"
              gap="1rem"
              w={"100%"}
              // border="1px solid red"
            >
              {processing ? (
                <Flex
                  w="100%"
                  height={"10rem"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Spinner />
                </Flex>
              ) : cnpjs.length ? (
                cnpjs.map((card: IInfo, index: number) => (
                  <SummaryCard
                    key={index}
                    data={card.data}
                    document={card.document}
                    hideActions
                  />
                ))
              ) : (
                <Flex
                  width={"100%"}
                  height={"100%"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  opacity={"0.5"}
                  justifyContent={"center"}
                >
                  <CiCloudOff size={30} />
                  <Text>Ainda não há cenário cadastrado para esse cliente</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            width={"60%"}
            paddingLeft={"10px"}
            flexDirection={"column"}
            gap="0.2rem"
          >
            <Text>
              Cenário <strong>com</strong> a{" "}
              <strong style={{ fontSize: 14 }}>Integracomm</strong>
            </Text>
            <Flex gap="0.4rem">
              <Text mb="unset">Período: </Text>
              <Input type="date" width={"20%"} height={"unset"} />
            </Flex>
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
                          handleEdit={function () {
                            throw new Error("Function not implemented.");
                          }}
                          handleDelete={function () {
                            throw new Error("Function not implemented.");
                          }}
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
          */}
      </Flex>
    </GenericPage>
  );
};
