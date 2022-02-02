import React, { ButtonHTMLAttributes } from "react";
import breakpoints from "../../commons/breakpoints";

export default function BigButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <>
      <style jsx>{`
        button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: 200;
          color: var(--blackish);
          border: none;
          border-radius: 0.2rem;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          button {
            margin-top: 1.5rem;
            padding: 0.8rem 1.5rem;
            font-size: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          button {
            margin-top: 2rem;
            padding: 1rem 2rem;
          }
        }
      `}</style>
      <button {...props} />
    </>
  );
}
