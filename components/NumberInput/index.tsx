import React, { HTMLProps } from "react";

export default function NumberInput(props: HTMLProps<HTMLInputElement>) {
  return (
    <>
      <style jsx>{`
        input {
          font-size: 1.5rem;
        }
      `}</style>
      <input type="number" {...props} />
    </>
  );
}
