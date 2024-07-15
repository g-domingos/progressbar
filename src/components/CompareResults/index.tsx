import ReactECharts from "echarts-for-react";
import Select from "react-select";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import colors from "../../styles/colors";
import { useQueryString } from "../../utils/queryString";
import { useTask } from "../../hooks/useTask";
import { useParams, useSearchParams } from "react-router-dom";
import {
  MONTHS_NAMES,
  formatEpochToDateDDMMYYY,
  getEpochFromDaysAgo,
  getFirstDayOfMonthInEpoch,
  getLastDayOfMonthInEpoch,
} from "../../utils/datesUtils";
import { LoadingSpinner } from "../LoadingSpinning";
import { CiCloudOff } from "react-icons/ci";
import { Tag } from "../Tag";

interface ICompareResponse {
  sales: {
    firstPeriodTotalSales: string | null;
    secondPeriodTotalSales: string | null;
    percentualDifference: number | null;
    firstSalesByDate: { x: any[]; y: any[] };
    secondSalesByDate: { x: any[]; y: any[] };
  };
  pedidos: {
    firstPedidosByDate: { x: any[]; y: any[] };
    secondPedidosByDate: { x: any[]; y: any[] };
    percentualDifference: number | null;
    firstPeriodTotalPedidos: string | null;
    secondPeriodTotalPedidos: string | null;
  };
}

type TCompareOptions =
  | "MONTH_COMPARATIVE"
  | "MONTH_ACCUMULATIVE"
  | "LAST_30_DAYS_COMPARATIVE";

interface IActionReducer {
  type: TCompareOptions;
}

interface IReducerState {
  type: TCompareOptions | null;
  firstDateStart: number;
  firstDateEnd: number;
  secondDateStart?: number;
  secondDateEnd?: number;
}

export const CompareResults = () => {
  const params = useParams();
  const [data, setData] = useState<ICompareResponse | null>(null);
  const [, setSearchParams] = useSearchParams();

  const { queryParams } = useQueryString();

  const { fetch, taskInfo, compare, processing } = useTask();

  const currentMonth = new Date().getMonth();

  const defaultState: IReducerState = {
    // type: "MONTH_COMPARATIVE",
    type: null,
    firstDateStart: getFirstDayOfMonthInEpoch(currentMonth - 1),
    firstDateEnd: getLastDayOfMonthInEpoch(currentMonth - 1),
    secondDateStart: getFirstDayOfMonthInEpoch(currentMonth),
    secondDateEnd: getLastDayOfMonthInEpoch(currentMonth),
  };

  const reducerCompareFunction = (
    state: IReducerState,
    action: IActionReducer
  ): IReducerState => {
    switch (action.type) {
      case "MONTH_COMPARATIVE": {
        return {
          firstDateStart: getFirstDayOfMonthInEpoch(currentMonth - 1),
          firstDateEnd: getLastDayOfMonthInEpoch(currentMonth - 1),
          secondDateStart: getFirstDayOfMonthInEpoch(currentMonth),
          secondDateEnd: getLastDayOfMonthInEpoch(currentMonth),
          type: action.type,
        };
      }

      case "MONTH_ACCUMULATIVE": {
        return {
          firstDateStart: getFirstDayOfMonthInEpoch(currentMonth - 1),
          firstDateEnd: getLastDayOfMonthInEpoch(currentMonth - 1),
          secondDateStart: getFirstDayOfMonthInEpoch(currentMonth),
          secondDateEnd: getLastDayOfMonthInEpoch(currentMonth),
          type: action.type,
        };
      }

      case "LAST_30_DAYS_COMPARATIVE": {
        return {
          ...state,
          firstDateStart: getEpochFromDaysAgo(60),
          firstDateEnd: getEpochFromDaysAgo(30, "END"),
          secondDateStart: getEpochFromDaysAgo(29),
          secondDateEnd: new Date().getTime(),
          type: action.type,
        };
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducerCompareFunction, defaultState);

  const handleSelectPeriodType = (type: TCompareOptions) => {
    dispatch({ type });
  };

  useEffect(() => {
    fetch(params?.id || "");
  }, []);

  const cnpjsOptions = useMemo(() => {
    if (taskInfo?.length) {
      const formatedForSelect = taskInfo.map((item: any) => {
        return {
          value: item.id,
          label: item.document,
          integrator: item.integrator || "",
        };
      });

      return formatedForSelect;
    }

    return [];
  }, [taskInfo]);

  const handleSelectCnpj = (
    option: {
      label: string;
      value: string | number;
      integrator: string;
    } | null
  ) => {
    if (option) {
      setSearchParams({
        ...queryParams,
        cnpjId: option.value.toString(),
        integrator: option.integrator,
      });
    } else {
      delete queryParams.cnpjId;
      delete queryParams.integrator;

      setSearchParams(queryParams);
    }
  };

  const styles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the overall container
      width: "240px", // Adjust width as needed
      borderRadius: "8px",
      backgroundColor: "#fff",
      borderColor: "#ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      height: "2.5rem",
      "&:hover": {
        borderColor: "#999",
      },
      border: "none",
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      // Customize individual options
      padding: "10px 15px",
      backgroundColor: state.isSelected ? "#f0f8ff" : "#fff",
      color: state.isSelected ? "#007bff" : "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f0f8ff",
      },
    }),

    menu: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the dropdown menu
      width: "250px", // Match the control width
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "24px",
      },
    }),

    // Customize other elements as needed:
    // singleValue, placeholder, multiValue, dropdownIndicator, etc.
  };

  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };

  const renderSeriesName = (state: IReducerState) => {
    switch (state.type) {
      case "MONTH_COMPARATIVE": {
        return {
          0: { name: MONTHS_NAMES[String(currentMonth - 1)] },
          1: { name: MONTHS_NAMES[String(currentMonth)] },
        };
      }

      case "MONTH_ACCUMULATIVE": {
        return {
          0: { name: MONTHS_NAMES[String(currentMonth - 1)] },
          1: { name: MONTHS_NAMES[String(currentMonth)] },
        };
      }

      case "LAST_30_DAYS_COMPARATIVE": {
        const { firstDateEnd, firstDateStart, secondDateEnd, secondDateStart } =
          state;

        return {
          0: {
            name:
              formatEpochToDateDDMMYYY(firstDateStart) +
              " a " +
              formatEpochToDateDDMMYYY(firstDateEnd),
          },
          1: {
            name:
              formatEpochToDateDDMMYYY(secondDateStart as number) +
              " a " +
              formatEpochToDateDDMMYYY(secondDateEnd as number),
          },
        };
      }

      default: {
        return {
          0: { name: "Primeiro Período" },
          1: { name: "Segundo Período" },
        };
      }
    }
  };

  const salesChartOptions = useMemo(() => {
    if (!data || processing) return {};

    const { sales } = data;
    const { firstSalesByDate, secondSalesByDate } = sales;

    const serieName = renderSeriesName(state);

    const series = [
      {
        name: serieName["0"].name,
        type: "line",
        smooth: true,
        emphasis: emphasisStyle,
        data: firstSalesByDate.y,
      },
      {
        name: serieName["1"].name,
        type: "line",
        smooth: true,
        emphasis: emphasisStyle,
        data: secondSalesByDate.y,
      },
    ];

    return {
      xAxis: {
        type: "category",
        data: firstSalesByDate.x.map((_item: any, index: number) => {
          return index + 1;
        }),
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      yAxis: {
        type: "value",
        name: "Reais",
      },
      series: series || [],
      grid: {
        left: "4%",
        bottom: "10%",
        right: "4%",
      },
      tooltip: {
        valueFormatter: (value: any) => "R$" + value.toFixed(2),
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
    };
  }, [data?.sales.firstSalesByDate.y]);

  const pedidosChartOptions = useMemo(() => {
    if (!data || processing) return {};

    const { pedidos } = data;
    const { firstPedidosByDate, secondPedidosByDate } = pedidos;

    const serieName = renderSeriesName(state);

    const series = [
      {
        name: serieName["0"].name,
        type: "line",
        smooth: true,
        emphasis: emphasisStyle,
        data: firstPedidosByDate.y,
      },
      {
        name: serieName["1"].name,
        type: "line",
        smooth: true,
        emphasis: emphasisStyle,
        data: secondPedidosByDate.y,
      },
    ];

    return {
      xAxis: {
        type: "category",
        data: firstPedidosByDate.x.map((_item: any, index: number) => {
          return index + 1;
        }),
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      yAxis: {
        type: "value",
        name: "Pedidos",
      },
      series: series || [],
      grid: {
        left: "4%",
        bottom: "10%",
        right: "4%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
    };
  }, [data?.pedidos.firstPedidosByDate.y]);

  const getTagColor = (value: string | number) => {
    if (+value < 0) {
      return colors.red;
    }
    return colors.primary[30];
  };

  useEffect(() => {
    if (!queryParams.cnpjId || !queryParams.integrator || !state.type) return;

    compare({
      cnpjId: queryParams.cnpjId,
      queryStringParameters: { ...queryParams, ...state },
      taskId: params.id || "",
    }).then((response) => setData(response));
  }, [state.type, queryParams.cnpjId]);

  return (
    <Flex
      w={"100%"}
      flexDirection={"column"}
      overflow={"auto"}
      gap={"0.5rem"}
    >
      <Flex
        alignItems={"center"}
        gap="1rem"
        padding="0.5rem 0"
      >
        <Text
          fontWeight={600}
          mb="unset"
        >
          Comparar Resultados
        </Text>

        <Select
          options={cnpjsOptions}
          styles={styles}
          isClearable
          placeholder="Selecionar CNPJ"
          onChange={handleSelectCnpj}
        />
      </Flex>
      <Flex
        width={"100%"}
        gap="1rem"
        alignItems={"flex-start"}
        fontSize={12}
        paddingRight={"6rem"}
      >
        <Flex
          w="100%"
          h="100%"
          gap="2rem"
          css={{
            button: {
              background: colors.gray[100],
              ":hover": { background: colors.gray[200] },
            },
          }}
        >
          <Button
            background={
              state.type === "MONTH_COMPARATIVE" ? "black !important" : ""
            }
            color={state.type === "MONTH_COMPARATIVE" ? "white !important" : ""}
            onClick={() => handleSelectPeriodType("MONTH_COMPARATIVE")}
          >
            Mês Atual/Mês Anterior
          </Button>
          <Button
            background={
              state.type === "MONTH_ACCUMULATIVE" ? "black !important" : ""
            }
            color={
              state.type === "MONTH_ACCUMULATIVE" ? "white !important" : ""
            }
            onClick={() => handleSelectPeriodType("MONTH_ACCUMULATIVE")}
          >
            Mês Atual/Mês Anterior (Acumulado)
          </Button>
          <Button
            background={
              state.type === "LAST_30_DAYS_COMPARATIVE"
                ? "black !important"
                : ""
            }
            color={
              state.type === "LAST_30_DAYS_COMPARATIVE"
                ? "white !important"
                : ""
            }
            onClick={() => handleSelectPeriodType("LAST_30_DAYS_COMPARATIVE")}
          >
            Últimos 30 dias (Comparativo)
          </Button>
        </Flex>
      </Flex>

      {!queryParams.cnpjId || !state.type ? (
        <Flex
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          opacity={"0.7"}
        >
          <CiCloudOff size={40} />
          <Text>Selecione uma loja para comparar</Text>
        </Flex>
      ) : (
        <Flex
          height={"100%"}
          overflow={"auto"}
          flexDirection={"column"}
          gap="1rem"
        >
          {processing ? (
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Spinner />
            </Flex>
          ) : (
            <Flex
              display={"block"}
              width={"100%"}
              height={"100%"}
              sx={{
                "& > div": {
                  maxHeight: "100% !important",
                },
              }}
            >
              <Flex flexDirection={"column"}>
                <Flex
                  flexDirection={"column"}
                  css={{
                    p: { marginBottom: "unset" },
                    div: {
                      justifyContent: "space-between",
                    },
                  }}
                  width={"20rem"}
                >
                  <Flex>
                    <Text
                      mb="unset"
                      fontWeight={800}
                      fontSize={18}
                    >
                      Faturamento
                    </Text>
                    <Tag
                      text={data?.sales.percentualDifference + " %" || ""}
                      background={getTagColor(
                        data?.sales.percentualDifference || 0
                      )}
                    />
                  </Flex>
                  <Flex gap="1rem">
                    <Text>{renderSeriesName(state)[0].name}</Text>
                    <Text fontWeight={700}>
                      R$ {data?.sales.firstPeriodTotalSales}
                    </Text>
                  </Flex>
                  <Flex gap="1rem">
                    <Text>{renderSeriesName(state)[1].name}</Text>
                    <Text fontWeight={700}>
                      R$ {data?.sales.secondPeriodTotalSales}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <ReactECharts option={salesChartOptions} />
            </Flex>
          )}

          {processing ? (
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Spinner />
            </Flex>
          ) : (
            <Flex
              display={"block"}
              width={"100%"}
              height={"100%"}
              sx={{
                "& > div": {
                  maxHeight: "100% !important",
                },
              }}
            >
              <Flex flexDirection={"column"}>
                <Flex
                  flexDirection={"column"}
                  css={{
                    p: { marginBottom: "unset" },
                    div: {
                      justifyContent: "space-between",
                    },
                  }}
                  width={"18rem"}
                >
                  <Flex
                    w={"100%"}
                    justifyContent={"inherit"}
                  >
                    <Text
                      mb="unset"
                      fontWeight={800}
                      fontSize={18}
                    >
                      Quantidade de Pedidos
                    </Text>
                    <Tag
                      text={data?.pedidos.percentualDifference + " %" || ""}
                      background={getTagColor(
                        data?.pedidos.percentualDifference || 0
                      )}
                    />
                  </Flex>
                  <Flex gap="1rem">
                    <Text>{renderSeriesName(state)[0].name}</Text>
                    <Text fontWeight={700}>
                      {data?.pedidos.firstPeriodTotalPedidos}
                    </Text>
                  </Flex>
                  <Flex gap="1rem">
                    <Text>{renderSeriesName(state)[1].name}</Text>
                    <Text fontWeight={700}>
                      {data?.pedidos.secondPeriodTotalPedidos}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <ReactECharts option={pedidosChartOptions} />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
