import React from "react";
import useResult from "../../hooks/useResult";
import { IResult } from "../../models/poll";

interface IResultStatisticsProps {
  totalOptions: number;
  votes?: IResult | null;
}

export default function ResultStatistics({
  totalOptions,
  votes,
}: IResultStatisticsProps) {
  const result = useResult(totalOptions, votes);

  if (!votes || !totalOptions) return null;

  const totalVotes = Object.keys(votes).length;
  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          padding: 1rem;
        }

        h2 {
          color: var(--primary-color);
          font-size: 2rem;
          font-weight: 200;
          margin-bottom: 1rem;
        }

        dl {
          display: grid;
          grid-template-columns: auto 1fr;
        }

        dd {
          margin-left: 1rem;
        }
      `}</style>
      <h2>Estatísticas</h2>
      <dl>
        {result.map((count, idx) => (
          <>
            <dt>{"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[idx % 26]}</dt>
            <dd>
              {count} ({Math.round((10000 * count) / totalVotes) / 100}%)
            </dd>
          </>
        ))}

        <dt>Total</dt>
        <dd>{totalVotes}</dd>
      </dl>
    </div>
  );
}
