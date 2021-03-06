import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import breakpoints from "../../commons/breakpoints";
import { pollExists } from "../../hooks/poll";
import BigButton from "../BigButton";
import BigInput from "../BigInput";

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

        @media (min-width: ${breakpoints.size.md}) {
          h1 {
            font-size: 6rem;
          }
        }
      `}</style>
      <h1>VotAqui</h1>
      <BigInput
        ref={inputRef}
        type="text"
        placeholder="ID da votação"
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
        errorMsg={errorMsg}
      />
      <BigButton onClick={goToPoll}>Entrar</BigButton>
    </div>
  );
}
