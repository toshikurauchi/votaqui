import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Main from "../../components/Main";
import Question from "../../components/Question";
import { useCurrentQuestion } from "../../hooks/poll";

const Home: NextPage = () => {
  const router = useRouter();
  const { slug: pollSlug } = router.query;
  const [currentQuestion, pollMeta] = useCurrentQuestion(pollSlug as string);

  return (
    <div>
      <Head>
        <title>VotAqui</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Question
          pollSlug={pollSlug as string}
          question={currentQuestion}
          pollMeta={pollMeta}
        />
      </Main>
    </div>
  );
};

export default Home;
