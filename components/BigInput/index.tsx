import React, { forwardRef, HTMLProps } from "react";
import breakpoints from "../../commons/breakpoints";

interface IBigInputProps extends HTMLProps<HTMLInputElement> {
  errorMsg?: string;
}

export default forwardRef(function BigInput(
  { errorMsg, ...props }: IBigInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      <style jsx>{`
        input {
          max-width: 100%;
          font-size: 1.5rem;
          padding: 0.5rem 1.5rem;
          border-radius: 999999px;
          color: var(--blackish);
          border-color: var(--primary-color);
        }

        .errorMsg {
          font-size: 1rem;
          color: var(--error-color);
          margin-top: 0.5rem;
        }

        @media (min-width: ${breakpoints.size.sm}) {
          input {
            font-size: 2rem;
            padding: 0.8rem 2rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          input {
            font-size: 4rem;
            padding: 1rem 3rem;
          }

          .errorMsg {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <input ref={ref} {...props} />
      {errorMsg && <span className="errorMsg">{errorMsg}</span>}
    </>
  );
});
