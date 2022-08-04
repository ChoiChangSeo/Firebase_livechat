import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction, ChangeEvent } from "react";
import ChatRoomPage from "../commons/unit/ChatRoom/ChatRoomContainer";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  padding: 3%;
`;

const GroupChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  padding: 2%;
`;
const ChatMain = styled.div`
  display: flex;
  justify-content: space-between;
  height: 500px;
`;
const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border: 1px solid #0085cb;
  border-radius: 5%;
  padding: 1%;
  overflow-y: scroll;
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
  setMakeRoom: Dispatch<SetStateAction<boolean>>;
  setGroupMember: Dispatch<SetStateAction<string[]>>;
  makeRoom: boolean;
  makeGroupRoom: boolean;
  makeGroupChatRoom: () => void;
  onChangeGroupMember: (checked: boolean, id: string) => void;
  inviteGroupMember: () => void;
  openOneRoom: (e: MouseEvent<HTMLButtonElement>) => void;
  oneRoomId: string;
  setOneRoomId: Dispatch<SetStateAction<string>>;
  fromChatRoom: any;
  groupMember: string[];
  userName: string;
}

interface IPropsEl {
  id: string;
  nickName: string;
  from: string;
}

export default function MainUI(props: IPropsMainUI) {
  return (
    <Wrapper>
      <GroupChatWrapper>
        <Button
          onClick={props.makeGroupChatRoom}
          style={{ marginBottom: "10px" }}
        >
          그룹채팅만들기
        </Button>
        {props.makeGroupRoom && (
          <Button onClick={props.inviteGroupMember}>초대하기</Button>
        )}
      </GroupChatWrapper>
      <ChatMain>
        <UserListWrapper>
          유저리스트
          {props.userList.map((el: IPropsEl) => (
            <UserList key={uuidv4()}>
              {props.makeGroupRoom ? (
                <>
                  {props.userName !== el.nickName && (
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        props.onChangeGroupMember(
                          e.currentTarget.checked,
                          el.nickName
                        );
                      }}
                      checked={
                        props.groupMember.includes(el.nickName) ? true : false
                      }
                    />
                  )}
                  <UserName>{el.nickName}</UserName>
                </>
              ) : (
                <UserName>{el.nickName}</UserName>
              )}
              <Button id={el.nickName} onClick={props.openOneRoom}>
                1:1채팅
              </Button>

              <Mark></Mark>
            </UserList>
          ))}
        </UserListWrapper>
        <UserListWrapper>
          {props.userName}님 채팅방 목록
          {props.fromChatRoom.map((el: IPropsEl) => (
            <div key={uuidv4()}>
              <Button
                style={{ wordBreak: "normal", height: "auto" }}
                id={el.from}
                onClick={props.openOneRoom}
              >
                {el.from}님과 채팅방
              </Button>
            </div>
          ))}
        </UserListWrapper>
        {props.makeRoom && (
          <ChatRoomPage
            setGroupMember={props.setGroupMember}
            setOneRoomId={props.setOneRoomId}
            oneRoomId={props.oneRoomId}
            groupMember={props.groupMember}
            setMakeRoom={props.setMakeRoom}
          />
        )}
      </ChatMain>
    </Wrapper>
  );
}
