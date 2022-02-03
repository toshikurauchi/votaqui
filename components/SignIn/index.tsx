import React, { useCallback, useRef, useState } from "react";
import breakpoints from "../../commons/breakpoints";
import BigButton from "../BigButton";
import BigInput from "../BigInput";

interface ISignInProps {
  createUsername: (username: string) => void;
}

export default function SignIn({ createUsername }: ISignInProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const validateAndSetUsername = useCallback(() => {
    const username = inputRef?.current?.value || "";

    if (!username) {
      setErrorMsg("O nome de usuário não pode ser vazio");
      return;
    } else if (username.match(/^\d/)) {
      setErrorMsg("O nome de usuário não pode iniciar com um número");
      return;
    } else if (username.match(/[^a-z0-9]/)) {
      setErrorMsg("O nome de usuário deve conter apenas letras e números");
      return;
    }
    setErrorMsg("");
    createUsername(username);
  }, [createUsername]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        validateAndSetUsername();
      }
    },
    [validateAndSetUsername]
  );

  const handleInputChange = useCallback(() => setErrorMsg(""), []);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        label {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: ${breakpoints.size.md}) {
          label {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
        }
      `}</style>
      <label>Escolha o nome de usuário</label>
      <BigInput
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        errorMsg={errorMsg}
      />
      <BigButton onClick={validateAndSetUsername}>Entrar</BigButton>
    </div>
  );
}
