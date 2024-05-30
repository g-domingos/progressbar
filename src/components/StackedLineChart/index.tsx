import { Text, Flex, Spinner } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { CiCloudOff } from "react-icons/ci";

export const StackedLineChart = ({
  data,
  processing,
  colors,
}: {
  data: { xAxis: any[]; data: any[] };
  colors: any;
  processing?: boolean;
}) => {
  const marketplaceslegend: any[] = [];
  const generatedSerie = Object.entries(data?.data || {}).map(
    ([ecommerce, chartData]: any) => {
      marketplaceslegend.push(ecommerce);
      return {
        name: ecommerce,
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: colors[ecommerce],
        },
        emphasis: {
          focus: "series",
        },
        data: chartData,
      };
    }
  );

  const option = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      //   text: "Histórico",
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
    legend: {
      data: marketplaceslegend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "6%",
      bottom: "35%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data?.xAxis || [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: generatedSerie,
  };

  return (
    <Flex height={"100%"} display={"block"} width="100%">
      {processing ? (
        <Flex
          w="100%"
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          opacity={"0.6"}
        >
          <Spinner />
        </Flex>
      ) : !generatedSerie.length ? (
        <Flex
          w="100%"
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          opacity={"0.6"}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <CiCloudOff size={30} />
            <Text>Não há dados para o período selecionado.</Text>
          </Flex>
        </Flex>
      ) : (
        <ReactECharts option={option} />
      )}
      {/* {isMobile && <ReactECharts option={mobileOption} />} */}
    </Flex>
  );
};
