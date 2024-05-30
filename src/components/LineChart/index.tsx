import { Flex } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";

export const LineChart = () => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        color: "black"
      },
    ],
    grid: {
      left: "4%",
      bottom: "14%",
    },
  };

  return (
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
      <ReactECharts option={option} />
    </Flex>
  );
};
