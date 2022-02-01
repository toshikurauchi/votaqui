import React, { useState } from "react";
import breakpoints from "../../commons/breakpoints";
import { IQuestion } from "../../models/poll";
import Option from "./Option";

interface IQuestionProps {
  question?: IQuestion | null;
}

export default function Question({ question }: IQuestionProps) {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(-1);

  if (!question) return null;
  return (
    <div className="container">
      <style jsx>{`
        .container {
          margin: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          font-size: 1.5rem;
          font-weight: 200;
        }

        .optionsContainer {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          .container {
            margin: 2rem;
          }

          h1 {
            font-size: 3rem;
            margin: 1.5rem 0 0.5rem;
          }

          p {
            font-size: 1.5rem;
          }

          .optionsContainer {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          .container {
            margin: 4rem;
          }

          h1 {
            font-size: 4rem;
            margin: 2rem 0 1rem;
          }

          p {
            font-size: 2.5rem;
          }

          .optionsContainer {
            gap: 2rem;
          }
        }
      `}</style>

      {question.title && <h1>{question.title}</h1>}
      {question.question && <p>{question.question}</p>}

      <div className="optionsContainer">
        {question.options.map((option, index) => (
          <Option
            option={option}
            index={index}
            selectedOptionIdx={selectedOptionIdx}
            setSelectedOptionIdx={setSelectedOptionIdx}
            key={`option--${option.image}--${option.text}`}
          />
        ))}
      </div>
    </div>
  );
}
