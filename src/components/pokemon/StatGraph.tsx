import { ResponsiveRadar } from "@nivo/radar";

interface StatGraphProps {
  chartData: { stat: string; value: number }[];
}
const StatGraph = ({ chartData }: StatGraphProps) => {
  return (
    <div className="relative w-40 h-40">
      <ResponsiveRadar
        data={chartData}
        keys={["value"]}
        indexBy="stat"
        maxValue={255}
        valueFormat=">-.2f"
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        borderColor="#719bfe"
        gridLevels={4}
        gridShape="linear"
        theme={{
          grid: {
            line: {
              strokeDasharray: "0", // 실선
            },
          },
        }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "blues" }}
        fillOpacity={1}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default StatGraph;
