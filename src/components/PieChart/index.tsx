import { Flex, useMediaQuery } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { ICardDetail } from "../SummaryCard";

export const PieChart = ({ data }: { data: ICardDetail[] }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const colorPallete: string[] = data?.map((item: any) => {
    return item.color;
  });

  const option = {
    title: {
      show: true,
      text: "Pedidos por Marketplace",
      left: 0,
      textStyle: {
        fontSize: "12px",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
      orient: isMobile ? "horizontal" : "vertical",
      top: isMobile ? null : "17%",
      bottom: isMobile ? 0 : 10,
      right: 0,
      data: data,
      itemWidth: 15,
      textStyle: {
        fontSize: "11px",
      },
      itemGap: 4,
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: isMobile ? ["40%", "65%"] : ["50%", "75%"],
        avoidLabelOverlap: true,
        padAngle: 1,
        itemStyle: {
          borderRadius: 6,
        },
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 6,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
        color: colorPallete,
        center: isMobile ? ["50%", "45%"] : ["50%", "30%"],
      },
    ],
  };

  const mobileOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      top: null,
      bottom: 0,
      right: 0,
      data: data,
      itemWidth: 15,
      textStyle: {
        fontSize: "11px",
      },
      itemGap: 4,
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "75%"],
        avoidLabelOverlap: true,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 6,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
        color: ["red", "white"],
        center: ["50%", "45%"],
      },
    ],
  };


  return (
    <Flex height={"14rem"} display={"block"} width="10rem">
      {!isMobile && <ReactECharts option={option} />}
      {isMobile && <ReactECharts option={mobileOption} />}
    </Flex>
  );
};
