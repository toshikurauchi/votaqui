import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";
import SlugInput from "../components/SlugInput";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VotAqui</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <SlugInput />
      </Main>
    </div>
  );
};

export default Home;
