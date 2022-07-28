import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';


function Home() {
  const router = useRouter()
  const moveToLogin = () => {
    router.push('/login')
  }
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-emotion)</title>
      </Head>
      <div>어서오세요 라이브챗 어플입니다.</div>
      <button onClick={moveToLogin}>로그인하기</button>
    </React.Fragment>
  );
};

export default Home;
