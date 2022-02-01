import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import Question from "../components/Question";
import { useCurrentQuestion } from "../hooks/poll";

const Home: NextPage = () => {
  const currentQuestion = useCurrentQuestion("dcu");

  return (
    <div>
      <Head>
        <title>VotAqui</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Question question={currentQuestion} />
      </Main>
    </div>
  );
};

export default Home;
