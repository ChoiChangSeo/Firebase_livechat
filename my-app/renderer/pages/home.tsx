import React from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const moveToLogin = () => {
    router.push("/login");
  };
  return (
    <React.Fragment>
      <div>어서오세요 라이브챗 어플입니다.</div>
      <button onClick={moveToLogin}>로그인하기</button>
    </React.Fragment>
  );
}

export default Home;
