import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import breakpoints from "../../commons/breakpoints";
import { submitVote } from "../../hooks/poll";
import { IPollMeta, IQuestion } from "../../models/poll";
import Option from "./Option";

interface IQuestionProps {
  pollSlug: string;
  question?: IQuestion | null;
  pollMeta: IPollMeta | null;
}

export default function Question({
  pollSlug,
  question,
  pollMeta,
}: IQuestionProps) {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(-1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOptionIdx(-1);
    setSubmitted(false);
  }, [pollMeta?.currentQuestion]);

  const handleSubmit = useCallback(() => {
    setLoading(true);

    toast
      .promise(submitVote(pollSlug, "andrewtnk", selectedOptionIdx), {
        pending: "Enviando seu voto...",
        success: "Voto enviado!",
        error:
          "Ocorreu um erro ao enviar seu voto! Por favor, tente novamente.",
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
        setSubmitted(false);
      })
      .finally(() => {
        setSelectedOptionIdx(-1);
        setLoading(false);
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
      });
  }, [pollSlug, selectedOptionIdx]);

  const votingDisabled = loading || submitted || !pollMeta?.acceptingVotes;

  if (!question || (pollMeta?.currentQuestion ?? -1) < 0) return null;
  return (
    <div className="container">
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        limit={1}
        closeOnClick
      />
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
          margin: 1rem 0;
          font-size: 1.5rem;
          font-weight: 200;
        }

        .optionsContainer {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .voteButton {
          margin: 2rem 0 0 auto;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 0.2rem;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease 0s;
        }
        .voteButton:disabled {
          background-color: #d3d3d3;
        }
        .voteButton:hover:enabled {
          box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
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

          .voteButton {
            font-size: 1.5rem;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
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

          .voteButton {
            font-size: 2rem;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
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
            disabled={votingDisabled}
            key={`option--${option.image}--${option.text}`}
          />
        ))}
      </div>

      <button
        className="voteButton"
        disabled={selectedOptionIdx < 0 || votingDisabled}
        onClick={handleSubmit}
      >
        Votar
      </button>

      {!pollMeta?.acceptingVotes && (
        <p>A votação está encerrada. Por favor, aguarde o resultado.</p>
      )}
      {submitted && !!pollMeta?.acceptingVotes && (
        <>
          <p>
            Você já enviou seu voto. Por favor, aguarde o resultado.
            <br />
            Se quiser mudar seu voto, recarregue a página.
          </p>
        </>
      )}
    </div>
  );
}
