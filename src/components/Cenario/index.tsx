import { Flex } from "@chakra-ui/react";
import { PieChart } from "../PieChart";
import { StackedLineChart } from "../StackedLineChart";
import { SummaryCard } from "../SummaryCard";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";

interface ICenario {
  cnpjId: string;
  gridTemplateColumns: string;
  integrator?: string;
}

export const Cenario = ({
  cnpjId,
  gridTemplateColumns,
  integrator,
}: ICenario) => {
  const [data, setData] = useState<any>({});

  const params = useParams();

  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const fetchSummaryByCNPJ = async () => {
    const queryParameters = { integrator: integrator || "" } || {};

    return request({
      method: "get",
      pathParameters: `/sales-summary/${cnpjId}`,
      queryStringParameters: queryParameters,
    }).then((response) => {
      setData(response);
    });
  };

  useEffect(() => {
    if (!processing && cnpjId) {
      fetchSummaryByCNPJ();
    }
  }, [cnpjId]);

  return (
    <Flex
      borderBottom="1px solid lightgray"
      display={"grid"}
      padding="1rem 0"
      gap="1rem"
      gridTemplateColumns={gridTemplateColumns}
    >
      <Flex className="Antes" borderRight={"1px solid lightgray"}>
        <Flex transform={"scale(0.90)"}>
          <SummaryCard
            data={data?.currentCnpj?.data || []}
            document={data?.currentCnpj?.document}
            hideActions
          />
        </Flex>
      </Flex>
      <Flex className="Depois" maxH={"14rem"}>
        <Flex width={"40%"} justifyContent={"space-between"}>
          <SummaryCard
            data={data?.summaryData || []}
            document={data?.currentCnpj?.document}
            hideActions
          />
          <PieChart data={data?.summaryData} />
        </Flex>
        <Flex flex={1}>
          <StackedLineChart
            data={data?.lineChart}
            colors={data?.colorsByMarketPlace}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
