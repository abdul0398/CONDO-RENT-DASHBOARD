import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, ChartOptions } from "chart.js";
import { registerables } from "chart.js";
import { MyContext } from "@/context/context";
import { convertDateFormat } from "../../../../libs/tools";

// Register the CategoryScale plugin
Chart.register(...registerables);

// Defining the LineChart component
const Graph = () => {
  const { graphCalculation } = useContext(MyContext);
  const [dynamicDataset, setData] = useState<any[]>([]);
  const [dynamicLabels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels: string[] = Object.keys(graphCalculation);
    const labelsDate = labels.map((date) => convertDateFormat(date));
    const dataset = [
      {
        label: "Rent",
        data: Object.values(graphCalculation).map((data: any) => {
          return data.averageRent;
        }),
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "Rent/Sqft",
        data: Object.values(graphCalculation).map((data: any) => {
          return data.averageRentSqft;
        }),
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ];
    setData(dataset);
    setLabels(labelsDate);
  }, [graphCalculation]);
  const data = {
    labels: dynamicLabels,
    datasets: dynamicDataset,
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Rent",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="">
      <Line height={600} width={2000} data={data} options={options} />
    </div>
  );
};

export default Graph;
