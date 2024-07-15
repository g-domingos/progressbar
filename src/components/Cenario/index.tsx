import { LuBarChart3 } from "react-icons/lu";
import { Text, Flex, Button, Tooltip } from "@chakra-ui/react";
import { PieChart } from "../PieChart";
import { StackedLineChart } from "../StackedLineChart";
import { SummaryCard } from "../SummaryCard";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { DatePickerComponent } from "../DatePickerComponent";
import { Tag } from "../Tag";
import colors from "../../styles/theme";
import { CompareModal } from "../CompareModal";

interface ICenario {
  cnpjId: string;
  gridTemplateColumns: string;
  integrator?: string;
}

interface ICenarioAPIResponse {
  currentCnpj: {
    document: string;
    extraInfo: string | undefined;
    data: { name: string; value: string; id: number }[];
  };
  summaryData: { name: string; value: string; color?: string }[];
  colorsByMarketPlace: any;
  pieChart: { name: string; value: string; id: number }[];
  lineChart: {
    data: any;
    xAxis: string[];
  };
  totalQuantityPedidos?: number | null;
  totalSummedValuePedidosAfterIntegracomm?: number | null;
  totalSummedValueBeforeIntegracomm?: number | null;
}

const EMPTY_RESPONSE = {
  currentCnpj: { data: [], document: "", extraInfo: "" },
  summaryData: [],
  colorsByMarketPlace: {},
  pieChart: [],
  lineChart: {
    data: {},
    xAxis: [],
  },
  totalQuantityPedidos: null,
  totalSummedValuePedidosAfterIntegracomm: null,
  totalSummedValueBeforeIntegracomm: null,
};

export const Cenario = ({
  cnpjId,
  gridTemplateColumns,
  integrator = "",
}: ICenario) => {
  const [data, setData] = useState<ICenarioAPIResponse>(EMPTY_RESPONSE);

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

  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setHeight(Math.random());
      }
    };

    // Add event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Flex
      borderBottom="1px solid lightgray"
      display={"grid"}
      padding="1rem 0"
      gap="1rem"
      position={"relative"}
      gridTemplateColumns={gridTemplateColumns}
      height={256 + height}
    >
      <Flex position={"absolute"}>
        <Tag
          text={integrator}
          background={renderBackgroundColor(integrator)}
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
            total={data?.totalSummedValueBeforeIntegracomm}
            hideActions
          />
        </Flex>
      </Flex>
      <Flex
        className="Depois"
        maxH={"14rem"}
      >
        <Flex
          width={"40%"}
          justifyContent={"space-between"}
        >
          <SummaryCard
            data={data?.summaryData || []}
            document={data?.currentCnpj?.document}
            hideActions
            total={data?.totalSummedValuePedidosAfterIntegracomm}
          />
          <PieChart
            data={data?.pieChart}
            total={data.totalQuantityPedidos}
          />
        </Flex>
        <Flex
          flex={1}
          flexDirection={"column"}
          paddingRight={"2rem"}
          height={"14rem"}
        >
          <Flex
            justifyContent={"flex-end"}
            padding={"0 1rem"}
            alignItems={"center"}
            gap="1rem"
          >
            <DatePickerComponent
              request={fetchSummaryByCNPJ}
              defaultDates={defaultInitialDate}
              hideClearButton
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
