import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import ChatRoomPage from "../commons/unit/ChatRoom/ChatRoomContainer";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  padding: 3%;
`;
const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border: 1px solid #0085cb;
  border-radius: 5%;
`;
const UserName = styled.div`
  font-size: 20px;
`;
const UserList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  padding: 2%;
  border-bottom: 1px solid #0085cb;
`;
const Button = styled.button`
  height: 20px;
  border: none;
  border-radius: 5%;
  background-color: #0085cb;
  color: white;
`;

const Mark = styled.div``;
interface IPropsMainUI {
  userList: any;
  openChatRoom: (e: MouseEvent<HTMLButtonElement>) => void;
  setMakeRoom: Dispatch<SetStateAction<boolean>>;
  makeRoom: boolean;
  chatRoomId: string;
}

interface IPropsEl {
  id: string;
  nickName: string;
}

export default function MainUI(props: IPropsMainUI) {
  return (
    <Wrapper>
      <UserListWrapper>
        {props.userList.map((el: IPropsEl) => (
          <>
            <UserList key={el.id}>
              <UserName>{el.nickName}</UserName>
              <Button id={el.id} onClick={props.openChatRoom}>
                채팅참여
              </Button>
            </UserList>
            <Mark></Mark>
          </>
        ))}
      </UserListWrapper>
      {props.makeRoom && (
        <ChatRoomPage
          setMakeRoom={props.setMakeRoom}
          chatRoomId={props.chatRoomId}
        />
      )}
    </Wrapper>
  );
}
