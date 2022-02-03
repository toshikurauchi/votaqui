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
          gap: 2rem;
          padding: 1rem;
          border: 1px solid var(--blackish);
          border-radius: 0.2rem;
        }

        .control {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .control.grow {
          flex-grow: 1;
        }

        .control label {
          margin-bottom: 0.2rem;
        }

        select {
          padding: 0.5rem 1rem;
          border-radius: 0.2rem;
        }
      `}</style>

      <div className="control">
        <label>Aceita respostas:</label>
        <ToggleInput
          checked={meta?.acceptingVotes}
          onChange={handleCheckedChange}
        />
      </div>

      <div className="control grow">
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
