import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  ChartData: any;
}

export const Chart: React.FC<Props> = ({ ChartData }) => {
  return (
    <div className="chart">
      <Bar
        data={ChartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Tổng số lượng các sản phẩm đã được bán",
              font: {
                size: 23,
              },
              padding: {
                top: 10,
                bottom: 10,
              },
            },

            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
