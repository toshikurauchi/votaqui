import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import Question from "../components/Question";
import { useCurrentQuestion } from "../hooks/poll";

const Home: NextPage = () => {
  const pollSlug = "dcu";
  const [currentQuestion, pollMeta] = useCurrentQuestion(pollSlug);

  return (
    <div>
      <Head>
        <title>VotAqui</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Question
          pollSlug={pollSlug}
          question={currentQuestion}
          pollMeta={pollMeta}
        />
      </Main>
    </div>
  );
};

export default Home;
