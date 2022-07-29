import styled from "@emotion/styled";

export const ChatRoom = styled.form`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #0085cb;
  border-radius: 20px;
  /* position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6); */
`;
export const TalkHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background-color: #0085cb;
  color: #0085cb;
`;

export const MessageWrapper = styled.div`
  height: 500px;
  overflow-y: scroll;
  padding: 5px 20px 0px 20px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Text = styled.div`
  max-width: 80%;
  word-break: break-all;
  background-color: #ffcf00;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 11px;
`;
export const TalkWrite = styled.input`
  height: 30px;
  font-size: 13px;
  border-radius: 0px 0px 20px 20px;
  border: 2.2px solid #0085cb;
  border-top: 2.2px solid #0085cb;
  padding: 10px;
  ::placeholder {
    font-size: 11px;
    display: flex;
    justify-content: center;
  }
`;
export const Button = styled.button`
  display: none;
`;

export const Close = styled.div`
  margin-right: 14px;
  color: black;
  cursor: pointer;
`;
