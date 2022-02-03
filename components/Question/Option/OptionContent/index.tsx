import React from "react";
import breakpoints from "../../../../commons/breakpoints";
import { IOption } from "../../../../models/poll";
import OptionImage from "../OptionImage";

interface IOptionContentProps {
  option: IOption;
  index: number;
}

export default function OptionContent({ option, index }: IOptionContentProps) {
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index % 26];
  return (
    <>
      <style jsx>{`
        .label {
          display: block;
          color: var(--primary-color);
          font-weight: 700;
          font-size: 1rem;
          margin: 0.5rem 0.5rem 0;
          text-align: center;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          .label {
            font-size: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
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
    </>
  );
}
