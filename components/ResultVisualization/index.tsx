import React, { useEffect, useState } from "react";
import useResult from "../../hooks/useResult";
import { IResult } from "../../models/poll";
import BarChart from "../DoughnutChart";

interface IResultVisualizationProps {
  totalOptions: number;
  votes?: IResult | null;
}

export default function ResultVisualization({
  totalOptions,
  votes,
}: IResultVisualizationProps) {
  const result = useResult(totalOptions, votes);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          padding: 1rem;
        }

        .chartContainer {
          display: flex;
          width: 100%;
          max-width: min(100%, 30rem);
        }

        h2 {
          color: var(--primary-color);
          font-size: 2rem;
          font-weight: 200;
          margin-bottom: 1rem;
        }
      `}</style>
      <h2>Votos</h2>
      <div className="chartContainer">
        <BarChart data={result} />
      </div>
    </div>
  );
}
