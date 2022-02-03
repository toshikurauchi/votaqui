import React, { useCallback } from "react";
import { IPollMetaWithSetters } from "../../hooks/poll";
import { IQuestion } from "../../models/poll";
import ToggleInput from "../ToggleInput";

interface IPollControlProps {
  meta: IPollMetaWithSetters;
  questions: IQuestion[];
}

export default function PollControl({ meta, questions }: IPollControlProps) {
  const handleCheckedChange = useCallback(
    (event) => {
      meta?.setAcceptingVotes(event.target.checked);
    },
    [meta]
  );

  const handleSetCurrentQuestion = useCallback(
    (event) => {
      meta?.setCurrentQuestion(event.target.value);
    },
    [meta]
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-radius: 0.2rem;
        }

        h2 {
          color: var(--primary-color);
          margin: 1rem 0 0;
          font-size: 2rem;
          font-weight: 200;
        }

        .control {
          display: flex;
          flex-direction: column;
        }

        .control label {
          margin-bottom: 0.2rem;
        }

        select {
          padding: 0.5rem 1rem;
          border-radius: 0.2rem;
        }
      `}</style>

      <h2>Controle</h2>

      <div className="control">
        <label>Aceita respostas:</label>
        <ToggleInput
          checked={meta?.acceptingVotes}
          onChange={handleCheckedChange}
        />
      </div>

      <div className="control">
        <label>Questão atual:</label>
        <select
          onChange={handleSetCurrentQuestion}
          value={meta?.currentQuestion}
        >
          {questions.map((question, idx) => (
            <option key={`question--${idx}`} value={idx}>
              {`Questão ${idx + 1}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
