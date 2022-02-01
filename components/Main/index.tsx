import React, { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

export default function Main({ children }: IContainerProps) {
  return (
    <main className="container">
      <style jsx>{`
        .container {
          min-width: 100vw;
          min-height: 100vh;
        }
      `}</style>
      {children}
    </main>
  );
}
