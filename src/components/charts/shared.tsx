import { CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

export const useSharedChartElements = ({
  sweetSpot,
  currentTemp,
}: {
  sweetSpot: number;
  currentTemp: number;
}) => [
  <CartesianGrid key="grid" />,
  <YAxis
    key="yaxis"
    dataKey="comfortableCount"
    tickLine={true}
    tickMargin={10}
  />,
  <XAxis
    key="xaxis"
    dataKey="temperature"
    tickLine={false}
    tickMargin={10}
    interval={1}
  />,
  <ReferenceLine
    key="current"
    x={currentTemp}
    stroke="var(--chart-1)"
    strokeWidth={2}
    strokeDasharray="3 3"
  />,
  <ReferenceLine
    key="sweet"
    x={sweetSpot}
    stroke="var(--chart-2)"
    strokeWidth={2}
    strokeDasharray="3 3"
  />,
];
