import { CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

export const useSharedChartElements = ({
  dataKey,
  sweetSpot,
  currentTemp,
}: {
  dataKey: string;
  sweetSpot: number;
  currentTemp: number;
}) => [
  <CartesianGrid key="grid" />,
  <YAxis
    key="yaxis"
    dataKey={dataKey}
    tickLine={true}
    tickMargin={10}
    domain={[0, "dataMax + 1"]}
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
    strokeWidth={3}
    strokeDasharray="6 3"
  />,
  <ReferenceLine
    key="sweet"
    x={sweetSpot}
    stroke="var(--chart-2)"
    strokeWidth={3}
    strokeDasharray="6 3"
  />,
];
