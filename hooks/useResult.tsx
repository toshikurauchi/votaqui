import { useEffect, useState } from "react";
import { IResult } from "../models/poll";

export default function useResult(
  totalOptions: number,
  votes?: IResult | null
) {
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

  return result;
}
