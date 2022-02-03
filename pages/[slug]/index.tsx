import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Main from "../../components/Main";
import Question from "../../components/Question";
import SignIn from "../../components/SignIn";
import { useCurrentQuestion } from "../../hooks/poll";
import useLocalStorage from "../../hooks/useLocalStorage";

const PollPage: NextPage = () => {
  const router = useRouter();
  const { slug: pollSlug } = router.query;
  const [currentQuestion, pollMeta] = useCurrentQuestion(pollSlug as string);
  const {
    value: username,
    setValue: createUsername,
    removeValue: logout,
  } = useLocalStorage("votaqui--username");

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

export default PollPage;
