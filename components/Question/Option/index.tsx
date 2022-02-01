import React, { useCallback } from "react";
import breakpoints from "../../../commons/breakpoints";
import { IOption } from "../../../models/poll";
import OptionImage from "./OptionImage";

interface IOptionProps {
  option: IOption;
  index: number;
  selectedOptionIdx: number;
  setSelectedOptionIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function Option({
  option,
  index,
  selectedOptionIdx,
  setSelectedOptionIdx,
}: IOptionProps) {
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index % 26];
  const handleClick = useCallback(() => {
    if (index === selectedOptionIdx) setSelectedOptionIdx(-1);
    else setSelectedOptionIdx(index);
  }, [index, selectedOptionIdx, setSelectedOptionIdx]);

  return (
    <button onClick={handleClick}>
      <style jsx>{`
        button {
          padding: ${index === selectedOptionIdx ? "0.5rem" : "1rem"};
          background-color: white;
          border: ${index === selectedOptionIdx
            ? "0.5rem solid var(--primary-color)"
            : "0 solid var(--primary-color)"};
          border-radius: 0.5rem;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease 0s;
          cursor: pointer;
          outline: none;
        }
        button:hover {
          box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
          color: #fff;
        }

        .label {
          display: block;
          color: var(--primary-color);
          font-weight: 700;
          font-size: 1rem;
          margin: 0.5rem 0.5rem 0;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          .label {
            font-size: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          button {
            padding: ${index === selectedOptionIdx ? "1.5rem" : "2rem"};
          }

          .label {
            font-size: 2rem;
            margin: 1rem 0.5rem 0;
          }
        }
      `}</style>
      {option.image && (
        <OptionImage alt={`Opção ${index + 1}`} option={option} />
      )}
      <span className="label">{letter}</span>
    </button>
  );
}
