import React from "react";
import breakpoints from "../../commons/breakpoints";
import { IQuestion } from "../../models/poll";
import OptionContent from "../Question/Option/OptionContent";

interface IQuestionViewProps {
  question: IQuestion;
}

export default function QuestionView({ question }: IQuestionViewProps) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          position: relative;
          margin: 2rem 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid var(--blackish);
          padding: 0.5rem 1rem;
        }

        h1 {
          text-align: center;
          color: var(--primary-color);
          font-size: 2rem;
          margin: 1rem 0 0.5rem;
        }

        p {
          text-align: center;
          max-width: 50ch;
          color: var(--primary-color);
          margin: 1rem 0;
          font-size: 1.5rem;
          font-weight: 200;
        }

        .optionsContainer {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          h1 {
            font-size: 3rem;
            margin: 1.5rem 0 0.5rem;
          }

          p {
            font-size: 1.5rem;
          }
          p.question {
            margin-bottom: 2rem;
          }

          .optionsContainer {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          h1 {
            font-size: 2rem;
            margin: 2rem 0 1rem;
          }

          p {
            font-size: 1.5rem;
          }
          p.question {
            margin-bottom: 2rem;
          }

          .optionsContainer {
            gap: 1rem;
          }
        }
      `}</style>

      {question.title && <h1>{question.title}</h1>}
      {question.question && (
        <p
          className="question"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      )}

      <div className="optionsContainer">
        {question.options.map((option, index) => (
          <div key={`option--${option.image}--${option.text}`}>
            <OptionContent option={option} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
