import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { generate } from "patternomaly";
import { colormap } from "./colormap";

type ColormapIndex = keyof typeof colormap.Pastel;

const buildColors = (n: number) => {
  let colors: string[] = [];
  while (n > 0) {
    const curN = Math.max(0, Math.min(11, n)).toString() as ColormapIndex;
    colors = colors.concat(colormap.Pastel[curN] as string[]);
    n -= 11;
  }
  return colors;
};

const parseData = (data: number[]) => {
  const colors = buildColors(data.length);

  return {
    labels: data.map((n, idx) => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[idx % 26]),
    datasets: [
      {
        data: data,
        backgroundColor: generate(colors),
      },
    ],
  };
};

interface IChartProps {
  data: number[];
}

export default function BarChart({ data }: IChartProps) {
  const options = {
    hoverOffset: 10,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 32,
          },
        },
      },
    },
  };
  return <Doughnut data={parseData(data)} options={options as any} />;
}
