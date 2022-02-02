import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import breakpoints from "../../commons/breakpoints";
import { pollExists } from "../../hooks/poll";

export default function SlugInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const goToPoll = useCallback(() => {
    const pollSlug = inputRef?.current?.value || "";

    const msg = `A votação "${pollSlug}" não existe`;
    if (!pollSlug) {
      setErrorMsg(msg);
      return;
    }
    pollExists(pollSlug).then((exists) => {
      if (exists) {
        router.push(`/${pollSlug}`);
      } else {
        setErrorMsg(msg);
      }
    });
  }, [router]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        goToPoll();
      }
    },
    [goToPoll]
  );

  const handleInputChange = useCallback(() => setErrorMsg(""), []);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          color: var(--primary-color);
          margin-top: -6rem;
          margin-bottom: 4rem;
          font-size: 4rem;
        }

        input {
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
          input {
            font-size: 2rem;
            padding: 0.8rem 2rem;
          }

          button {
            margin-top: 1.5rem;
            padding: 0.8rem 1.5rem;
            font-size: 1.5rem;
          }
        }

        @media (min-width: ${breakpoints.size.md}) {
          h1 {
            font-size: 6rem;
          }

          input {
            font-size: 4rem;
            padding: 1rem 3rem;
          }

          .errorMsg {
            font-size: 1.5rem;
          }

          button {
            margin-top: 2rem;
            padding: 1rem 2rem;
          }
        }
      `}</style>
      <h1>VotAqui</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="ID da votação"
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
      />
      {errorMsg && <span className="errorMsg">{errorMsg}</span>}
      <button onClick={goToPoll}>Entrar</button>
    </div>
  );
}
