import { Text, Flex } from "@chakra-ui/react";
import { PieChart } from "../PieChart";
import { StackedLineChart } from "../StackedLineChart";
import { SummaryCard } from "../SummaryCard";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { DatePickerComponent } from "../DatePickerComponent";
import { Tag } from "../Tag";
import colors from "../../styles/theme";

interface ICenario {
  cnpjId: string;
  gridTemplateColumns: string;
  integrator?: string;
}

export const Cenario = ({
  cnpjId,
  gridTemplateColumns,
  integrator = "",
}: ICenario) => {
  const [data, setData] = useState<any>({});

  const params = useParams();

  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const defaultDate = () => {
    let firstDayOfMonth = new Date().setDate(1);

    firstDayOfMonth = new Date(firstDayOfMonth).setHours(0, 0, 0, 0);

    const today = new Date().getTime();

    return {
      minDate: firstDayOfMonth,
      maxDate: today,
    };
  };

  const [defaultInitialDate, setDefaultInitialDate] = useState<any>(
    defaultDate()
  );

  useEffect(() => {}, []);

  const fetchSummaryByCNPJ = async ({
    minDate,
    maxDate,
  }: {
    minDate?: number;
    maxDate?: number;
  }) => {
    if (processing) return;

    const queryParameters: any =
      {
        integrator: integrator,
        minDate: minDate || "",
        maxDate: maxDate || "",
      } || {};

    return request({
      method: "get",
      pathParameters: `/sales-summary/${cnpjId}`,
      queryStringParameters: queryParameters,
    }).then((response) => {
      setData(response);
    });
  };

  const renderBackgroundColor = (integrator: string) => {
    if (integrator?.toLocaleLowerCase() === "bling") {
      return colors.bling;
    }

    if (integrator?.toLocaleLowerCase() === "tiny") {
      return colors.tiny;
    }

    return "";
  };

  useEffect(() => {
    if (!processing && cnpjId) {
      const { minDate, maxDate } = defaultDate();
      fetchSummaryByCNPJ({ minDate, maxDate });
    }
  }, [cnpjId]);

  return (
    <Flex
      borderBottom="1px solid lightgray"
      display={"grid"}
      padding="1rem 0"
      gap="1rem"
      position={"relative"}
      gridTemplateColumns={gridTemplateColumns}
    >
      <Flex position={"absolute"}>
        <Tag
          text={data?.currentCnpj?.integrator}
          background={renderBackgroundColor(data?.currentCnpj?.integrator)}
          color="white"
        />
      </Flex>

      <Flex
        className="Antes"
        borderRight={"1px solid lightgray"}
        flexDirection={"column"}
      >
        <Flex transform={"scale(0.90)"}>
          <SummaryCard
            data={data?.currentCnpj?.data || []}
            extraInfo={data?.currentCnpj?.extraInfo}
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
        <Flex
          flex={1}
          flexDirection={"column"}
          gap="1rem"
          paddingRight={"2rem"}
        >
          <Flex justifyContent={"flex-end"} padding={"0 1rem"}>
            <DatePickerComponent
              request={fetchSummaryByCNPJ}
              defaultDates={defaultInitialDate}
            />
          </Flex>
          <StackedLineChart
            processing={processing}
            data={data?.lineChart}
            colors={data?.colorsByMarketPlace}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
