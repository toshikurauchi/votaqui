import { useRouter } from "next/router";
import React from "react";
import { usePollMeta, useQuestions, useVotes } from "../../hooks/poll";
import PollControl from "../PollControl";
import ResultVisualization from "../ResultVisualization";

export default function PollAdmin() {
  const router = useRouter();
  const { slug } = router.query;

  const meta = usePollMeta(slug as string);
  const votes = useVotes(slug as string);
  const questions = useQuestions(slug as string);
  const currentQuestion = questions[meta?.currentQuestion || 0];
  const totalOptions = currentQuestion?.options?.length || 0;

  return (
    <div className="container">
      <style jsx>{`
        .container {
          padding: 2rem;
        }
      `}</style>
      {meta && <PollControl meta={meta} questions={questions} />}
      {totalOptions && (
        <ResultVisualization votes={votes} totalOptions={totalOptions} />
      )}
    </div>
  );
}
