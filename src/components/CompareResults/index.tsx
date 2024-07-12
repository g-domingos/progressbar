import ReactECharts from "echarts-for-react";
import Select from "react-select";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DatePickerComponent } from "../DatePickerComponent";
import colors from "../../styles/colors";
import { useQueryString } from "../../utils/queryString";
import { useTask } from "../../hooks/useTask";
import { useParams, useSearchParams } from "react-router-dom";
import { Tag } from "../Tag";

const FIRST_INTERVAL_QUERY_NAME = "firstDate";
const SECOND_INTERVAL_QUERY_NAME = "secondDate";

interface ICompareResponse {
  firstPeriodSalesSummary: number;
  secondPeriodSalesSummary: number;
  percentualDifference: any[];
  firstPeriodLineChart: any[];
  secondPeriodLineChart: any[];
  chartData: any;
}

export const CompareResults = () => {
  const params = useParams();
  const [shouldCompare, setShouldCompare] = useState<boolean>(false);
  const [compareResults, setCompareResults] = useState<ICompareResponse | null>(
    null
  );
  const [, setSearchParams] = useSearchParams();

  const { queryParams } = useQueryString();

  const { fetch, taskInfo, compare, processing } = useTask();

  useEffect(() => {
    const queryParamsKeys = Object.keys(queryParams);

    const hasFirstIntervalQueryParam = queryParamsKeys.filter((item: string) =>
      item.includes(FIRST_INTERVAL_QUERY_NAME)
    ).length;

    const hasSecondIntervalQueryParam = queryParamsKeys.filter((item: string) =>
      item.includes(SECOND_INTERVAL_QUERY_NAME)
    ).length;

    const hasCnpjId = !!queryParams.cnpjId;

    if (
      hasFirstIntervalQueryParam &&
      hasSecondIntervalQueryParam &&
      hasCnpjId
    ) {
      setShouldCompare(true);
    } else {
      setShouldCompare(false);
    }
  }, [queryParams]);

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

  const handleCompare = useCallback(() => {
    if (processing) return;

    compare({
      cnpjId: queryParams.cnpjId,
      queryStringParameters: queryParams,
      taskId: params.id || "",
    }).then((response) => setCompareResults(response));
  }, [processing, queryParams]);

  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };

  const chartOptions = useMemo(() => {
    if (!compareResults) return {};

    const { chartData } = compareResults;

    const generatedSeries = Object.entries(chartData).map(
      ([key, value]: any, index: number) => {
        return {
          name: key,
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          data: chartData[key],
        };
      }
    );

    // return {
    //   color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    //   title: {},
    //   tooltip: {
    //     trigger: "axis",
    //     axisPointer: {
    //       type: "cross",
    //       label: {
    //         backgroundColor: "#6a7985",
    //       },
    //     },
    //   },
    //   legend: {
    //     // data: marketplaceslegend,
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {},
    //     },
    //   },
    //   grid: {
    //     left: "3%",
    //     right: "6%",
    //     bottom: "35%",
    //     containLabel: true,
    //   },
    //   xAxis: {
    //     type: "category",
    //     boundaryGap: false,
    //     data: xAxisArray || [],
    //   },

    //   yAxis: {
    //     type: "value",
    //   },

    //   series: [
    //     {
    //       name: "Primeiro Período",
    //       type: "line",
    //       stack: "Total",
    //       data: firstPeriodLineChart,
    //     },
    //     {
    //       name: "Segundo Período",
    //       type: "line",
    //       stack: "Total",
    //       data: secondPeriodLineChart,
    //     },
    //   ],
    // };

    return {
      xAxis: {
        type: "category",
        data: ["Primeiro Período", "Segundo Período"],
      },
      brush: {
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        xAxisIndex: 0,
      },
      yAxis: {
        type: "value",
        name: "Reais",
      },
      series: generatedSeries || [],
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
  }, [compareResults]);

  const getTagColor = (value: string | number) => {
    if (+value < 0) {
      return colors.red;
    }
    return colors.primary[30];
  };

  return (
    <Flex
      w={"100%"}
      flexDirection={"column"}
      overflow={"auto"}
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
        {processing && <Spinner />}
      </Flex>
      <Flex
        width={"100%"}
        gap="1rem"
        alignItems={"flex-start"}
        fontSize={12}
        paddingRight={"6rem"}
      >
        <Flex flexDirection={"column"}>
          <Text mb="6px">Selecione um CNPJ </Text>
          <Select
            options={cnpjsOptions}
            styles={styles}
            isClearable
            placeholder="Selecionar"
            onChange={handleSelectCnpj}
          />
        </Flex>
        <Flex
          w="100%"
          h="100%"
          gap="2rem"
        >
          <Flex
            justifyContent={"space-around"}
            h="90%"
            flexDirection={"column"}
          >
            <Text mb="6px">Selecione o período inicial</Text>
            <DatePickerComponent
              request={() => {}}
              queryName={FIRST_INTERVAL_QUERY_NAME}
            />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-around"}
            h="90%"
          >
            <Text mb="6px">Selecione o período final</Text>
            <DatePickerComponent
              request={() => {}}
              queryName={SECOND_INTERVAL_QUERY_NAME}
            />
          </Flex>
        </Flex>
        <Button
          bg={shouldCompare ? colors.yellow : "lightgray"}
          onClick={() => {
            shouldCompare && !processing && handleCompare();
          }}
          padding="0.4rem 2rem"
          mt="1rem"
          opacity={shouldCompare ? "1" : "0.5"}
        >
          Comparar
        </Button>
      </Flex>

      <Flex
        mt="1.4rem"
        flexDirection={"column"}
      >
        <Text
          mb="unset"
          fontWeight={600}
        >
          Variação:
        </Text>
        <Flex
          gap="1rem"
          flexWrap={"wrap"}
          overflow={"auto"}
        >
          {compareResults?.percentualDifference?.map(
            ({ percentual, store }: { store: string; percentual: string }) => (
              <Flex
                gap="0.5rem"
                alignItems={"center"}
                border="1px solid lightgray"
                padding="5px 5px"
                borderRadius={"10px"}
              >
                <Text
                  mb="unset"
                  fontSize={store === "Total Período" ? 16 : 14}
                  fontWeight={store === "Total Período" ? 600 : undefined}
                >
                  {store}:
                </Text>
                <Tag
                  text={percentual + "%"}
                  background={getTagColor(percentual)}
                />
              </Flex>
            )
          )}
        </Flex>
      </Flex>

      <Flex height={"100%"}>
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
          <ReactECharts option={chartOptions} />
        </Flex>
      </Flex>
    </Flex>
  );
};
