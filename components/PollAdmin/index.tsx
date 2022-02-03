import { useRouter } from "next/router";
import React from "react";
import breakpoints from "../../commons/breakpoints";
import { usePollMeta, useQuestions, useVotes } from "../../hooks/poll";
import PollControl from "../PollControl";
import QuestionView from "../QuestionView";
import ResultStatistics from "../ResultStatistics";
import ResultVisualization from "../ResultVisualization";

export default function PollAdmin() {
  const router = useRouter();
  const { slug } = router.query;

  const meta = usePollMeta(slug as string);
  const currentQuestionIdx = meta?.currentQuestion || 0;
  const votes = useVotes(slug as string, currentQuestionIdx);
  const questions = useQuestions(slug as string);
  const currentQuestion = questions[currentQuestionIdx];
  const totalOptions = currentQuestion?.options?.length || 0;

  if (!totalOptions) return null;

  return (
    <div className="container">
      <style jsx>{`
        h1 {
          font-size: 3rem;
          color: var(--primary-color);
        }

        .container {
          padding: 2rem;
        }

        .contentContainer {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }

        .controls {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          .contentContainer {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      <h1>VotAqui</h1>

      <div className="contentContainer">
        <div>
          <QuestionView question={currentQuestion} />
          <div className="controls">
            {meta && <PollControl meta={meta} questions={questions} />}
            <ResultStatistics votes={votes} totalOptions={totalOptions} />
          </div>
        </div>
        <ResultVisualization votes={votes} totalOptions={totalOptions} />
      </div>
    </div>
  );
}
