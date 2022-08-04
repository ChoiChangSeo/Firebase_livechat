import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  height: 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5%;
  background-color: #0085cb;
  color: white;
`;
function Next() {
  const router = useRouter();
  const moveToLogin = () => {
    router.push("/login");
  };
  return (
    <React.Fragment>
      <Wrapper>
        <div>어서오세요 라이브챗 어플입니다.</div>
        <Button onClick={moveToLogin}>로그인하기</Button>
      </Wrapper>
    </React.Fragment>
  );
}

export default Next;
