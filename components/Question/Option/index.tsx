import React, { useCallback } from "react";
import breakpoints from "../../../commons/breakpoints";
import { IOption } from "../../../models/poll";
import OptionContent from "./OptionContent";

interface IOptionProps {
  option: IOption;
  index: number;
  disabled?: boolean;
  selectedOptionIdx: number;
  setSelectedOptionIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function Option({
  option,
  index,
  disabled,
  selectedOptionIdx,
  setSelectedOptionIdx,
}: IOptionProps) {
  const handleClick = useCallback(() => {
    if (index === selectedOptionIdx) setSelectedOptionIdx(-1);
    else setSelectedOptionIdx(index);
  }, [index, selectedOptionIdx, setSelectedOptionIdx]);

  return (
    <button onClick={handleClick} disabled={disabled}>
      <style jsx>{`
        button {
          min-width: 100%;
          min-height: 30vh;
          padding: ${index === selectedOptionIdx ? "0.5rem" : "1rem"};
          background-color: white;
          border: ${index === selectedOptionIdx
            ? "0.5rem solid var(--primary-color)"
            : "0 solid var(--primary-color)"};
          border-radius: 0.5rem;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.1s ease 0s;
          cursor: pointer;
          outline: none;
        }
        button:disabled {
          cursor: default;
          filter: opacity(0.5);
        }
        button:hover:enabled {
          box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: ${breakpoints.size.md}) {
          button {
            padding: ${index === selectedOptionIdx ? "1.5rem" : "2rem"};
          }
        }
      `}</style>
      <OptionContent option={option} index={index} />
    </button>
  );
}
