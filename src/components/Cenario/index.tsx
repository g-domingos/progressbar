import { Text, Flex, Button, Tooltip, filter } from "@chakra-ui/react";
import { PieChart } from "../PieChart";
import { StackedLineChart } from "../StackedLineChart";
import { SummaryCard } from "../SummaryCard";
import { useEffect, useState, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { DatePickerComponent } from "../DatePickerComponent";
import { Tag } from "../Tag";
import colors from "../../styles/theme";
import { CompareModal } from "../CompareModal";
import { useTask } from "../../hooks/useTask";

interface ICenario {
  cnpjId: string;
  gridTemplateColumns: string;
  integrator?: string;
  apiId: string;
  taskId?: string;
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
  apiId,
  taskId,
}: ICenario) => {
  const [data, setData] = useState<ICenarioAPIResponse>(EMPTY_RESPONSE);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const params = useParams();

  const { fetchFilters, filters = [] } = useTask();

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
    situacaosId = JSON.parse(localStorage.getItem("filters" + integrator) || "[]"),
  }: {
    minDate?: number;
    maxDate?: number;
    situacaosId?: any[];
  }) => {
    const queryParameters: any =
      {
        integrator: integrator,
        minDate: minDate || "",
        maxDate: maxDate || "",
        situacaosId,
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
    fetchFilters({
      integrador: integrator || "",
      taskId: taskId || "",
      cnpjId,
      apiId,
    });
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

  const handleSelectFilters = ({ id }: { id: number }) => {
    const isAlreadySelected = selectedFilters.includes(id);

    if (isAlreadySelected) {
      const filtered = selectedFilters.filter((item: any) => item !== id);
      setSelectedFilters(filtered);
    } else {
      setSelectedFilters([...selectedFilters, id]);
    }
  };

  useEffect(() => {
    const filtersOnStorage = JSON.parse(
      localStorage.getItem("filters" + integrator ) || "[]"
    );

    if (filtersOnStorage.length) {
      setSelectedFilters(filtersOnStorage);
      return;
    }

    const allFilters = filters.map((item: any) => {
      return item.id;
    });

    localStorage.setItem("filters" + integrator, JSON.stringify(allFilters));
    setSelectedFilters(allFilters);
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("filters" + integrator, JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={filters.length ? "flex-end" : "center"}
        gap="2rem"
      >
        <Tag
          text={integrator}
          background={renderBackgroundColor(integrator)}
          color="white"
        />
        <Flex
          className="filters"
          gap="0.5rem"
        >
          {filters.map((item: { id: number; nome: string }) => {
            const isSelected = selectedFilters.includes(item.id);

            return (
              <Button
                background={isSelected ? "black" : ""}
                color={isSelected ? "white" : ""}
                minW="unset"
                height={"unset"}
                padding="2px 5px"
                fontSize={12}
                onClick={() => handleSelectFilters({ id: item.id })}
              >
                {item.nome}
              </Button>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        borderBottom="1px solid lightgray"
        display={"grid"}
        padding="1rem 0"
        gap="1rem"
        position={"relative"}
        gridTemplateColumns={gridTemplateColumns}
        height={256 + height}
      >
        <Flex
          className="Antes"
          borderRight={"1px solid lightgray"}
          flexDirection={"column"}
          paddingRight={"0.5rem"}
        >
          <Flex>
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
                filters={selectedFilters}
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
    </>
  );
};
