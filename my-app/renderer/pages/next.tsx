import React from "react";
import Head from "next/head";
import LoginPage from "../components/Login/LoginContainer";

function Next() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript-emotion)</title>
      </Head>
      <LoginPage />
    </React.Fragment>
  );
}

export default Next;
