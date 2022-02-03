import React, { HTMLProps } from "react";

interface IToggleInputProps extends HTMLProps<HTMLInputElement> {
  height?: number;
  padding?: number;
}

export default function ToggleInput({
  height = 2,
  padding = 0.2,
  ...props
}: IToggleInputProps) {
  const width = 1.8 * height;
  const markerDiameter = height - 2 * padding;

  return (
    <>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: ${width}rem;
          height: ${height}rem;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: ${markerDiameter}rem;
          width: ${markerDiameter}rem;
          left: ${padding}rem;
          bottom: ${padding}rem;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: var(--primary-color);
        }

        input:focus + .slider {
          box-shadow: 0 0 1px var(--primary-color);
        }

        input:checked + .slider:before {
          transform: translateX(${width - 2 * padding - markerDiameter}rem);
        }

        .slider.round {
          border-radius: ${height}rem;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
      <label className="switch">
        <input type="checkbox" {...props} />
        <span className="slider round"></span>
      </label>
    </>
  );
}
