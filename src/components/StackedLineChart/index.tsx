import { Text, Flex, Spinner } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { CiCloudOff } from "react-icons/ci";
import { formatEpochToDateDDMMYYY } from "../../utils/datesUtils";

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
  const marketplacesColors: string[] = [];

  const xAxis: string[] =
    data?.xAxis.map((item) => {
      return formatEpochToDateDDMMYYY(+item);
    }) || [];

  const generatedSerie = Object.entries(data?.data || {}).map(
    ([ecommerce, chartData]: any) => {
      const datesOnChartData = chartData.map(
        (item: { value: number; date: string }) => {
          return item.date;
        }
      );

      //Se o gráfico não tiver valores de venda para determinado dia, irá colocar como 0
      data?.xAxis?.forEach((item: string) => {
        if (!datesOnChartData.includes(item)) {
          chartData.push({ date: +item, value: 0, epoch: +item });
        }
      });

      //Gerar as legendas
      marketplaceslegend.push(ecommerce);
      //Adicionar cores das legendas
      marketplacesColors.push(colors[ecommerce]);

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
        data: chartData.sort(
          (a: { epoch: number }, b: { epoch: number }) => a.epoch - b.epoch
        ),
      };
    }
  );

  const option = {
    color: marketplacesColors,
    title: {
      //   text: "Histórico",
    },
    tooltip: {
      confine: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: marketplaceslegend.sort((a: any, b: any) => a.localeCompare(b)),
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "6%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xAxis,
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
    <Flex
      height={"100%"}
      display={"block"}
      width="100%"
    >
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
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
          >
            <CiCloudOff size={30} />
            <Text>Não há dados para o período selecionado.</Text>
          </Flex>
        </Flex>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: "100%" }}
        />
      )}
      {/* {isMobile && <ReactECharts option={mobileOption} />} */}
    </Flex>
  );
};
