import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Main from "../../components/Main";
import Question from "../../components/Question";
import SignIn from "../../components/SignIn";
import { useCurrentQuestion } from "../../hooks/poll";

const LOCALSTORAGE_USERNAME_KEY = "votaqui--username";

const Home: NextPage = () => {
  const router = useRouter();
  const { slug: pollSlug } = router.query;
  const [currentQuestion, pollMeta] = useCurrentQuestion(pollSlug as string);
  const [username, setUsername] = useState<string | null>();

  useEffect(() => {
    setUsername(localStorage.getItem(LOCALSTORAGE_USERNAME_KEY));
  }, []);

  const createUsername = useCallback((username) => {
    localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, username);
    setUsername(username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
    setUsername(null);
  }, []);

  return (
    <div>
      <Head>
        <title>VotAqui</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        {!username && <SignIn createUsername={createUsername} />}
        {username && (
          <Question
            pollSlug={pollSlug as string}
            question={currentQuestion}
            pollMeta={pollMeta}
            username={username}
            logout={logout}
          />
        )}
      </Main>
    </div>
  );
};

export default Home;
