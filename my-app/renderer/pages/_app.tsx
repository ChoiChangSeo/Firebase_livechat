import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
import styled from "@emotion/styled";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </React.Fragment>
  );
}

export default MyApp;
