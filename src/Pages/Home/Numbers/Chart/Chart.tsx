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
              text: "Số đơn hàng trong năm 2021",
              font: {
                size: 23,
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
