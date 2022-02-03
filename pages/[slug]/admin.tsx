import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import AdminAuthorization from "../../components/AdminAuthorization";
import Main from "../../components/Main";
import PollAdmin from "../../components/PollAdmin";
import useLocalStorage from "../../hooks/useLocalStorage";

const AdminPage: NextPage = () => {
  const { value: authorizedString, setValue: setAuthorized } = useLocalStorage(
    "votaqui--authorized"
  );

  const [authorized, internalSetAuthorized] = useState<boolean>(false);
  useEffect(() => {
    internalSetAuthorized(authorizedString === "true");
  }, [authorizedString]);

  const authorize = useCallback(() => setAuthorized("true"), [setAuthorized]);

  return (
    <div>
      <Head>
        <title>VotAqui - Admin</title>
        <meta name="description" content="App de votações em tempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        {!authorized && <AdminAuthorization authorize={authorize} />}
        {authorized && <PollAdmin />}
      </Main>
    </div>
  );
};

export default AdminPage;
