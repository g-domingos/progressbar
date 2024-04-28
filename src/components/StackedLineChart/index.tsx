import { Flex } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";

export const StackedLineChart = ({
  data,
  colors,
}: {
  data: { xAxis: any[]; data: any[] };
  colors: any;
}) => {
  const marketplaceslegend: any[] = [];
  const generatedSerie = Object.entries(data.data || {}).map(
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
      right: "1%",
      bottom: "30%",
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
      <ReactECharts option={option} />
      {/* {isMobile && <ReactECharts option={mobileOption} />} */}
    </Flex>
  );
};
