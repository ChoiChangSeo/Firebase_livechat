import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiAZ9xpQkNGC4NboaoOYuO2SHVTJ4hUFk",
  authDomain: "chattest-18b5b.firebaseapp.com",
  projectId: "chattest-18b5b",
  storageBucket: "chattest-18b5b.appspot.com",
  messagingSenderId: "164411616933",
  appId: "1:164411616933:web:b55e79a47a8b104ba7e74c",
  measurementId: "G-17E03HTRLR"
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
