import React, { useEffect, useState } from "react";
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
  const [result, setResult] = useState<number[]>([]);
  useEffect(() => {
    const tempResults: number[] = [];
    for (let i = 0; i < totalOptions; i++) {
      tempResults.push(0);
    }

    if (votes) {
      Object.values(votes).forEach((choice) => tempResults[choice]++);
    }

    setResult(tempResults);
  }, [totalOptions, votes]);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          max-width: min(100%, 30rem);
          padding: 2rem;
        }
      `}</style>
      <BarChart data={result} />
    </div>
  );
}
