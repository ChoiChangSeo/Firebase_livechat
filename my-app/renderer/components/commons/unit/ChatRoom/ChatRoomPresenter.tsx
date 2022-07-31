import { firebaseAuth } from "../../../../pages/_app";
import { v4 as uuidv4 } from "uuid";
import * as S from "./ChatRoomStyles";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  LegacyRef,
  MouseEvent,
  SetStateAction,
} from "react";

interface IPropsChatRoomUI {
  sendMsg: (e: FormEvent<HTMLFormElement>) => void;
  closeChatRoom: (e: MouseEvent<HTMLDivElement>) => void;
  resultMsg: any;
  messagesEndRef: LegacyRef<HTMLDivElement>;
  onChangeMsg: (e: ChangeEvent<HTMLInputElement>) => void;
  msg: string;
}

interface IPropsData {
  id?: string;
  nickName?: string;
  message?: string;
}

export default function ChatRoomUI(props: IPropsChatRoomUI) {
  return (
    <S.ChatRoom onSubmit={props.sendMsg}>
      <S.TalkHeader>
        <S.Close onClick={props.closeChatRoom}>X</S.Close>
      </S.TalkHeader>
      <S.MessageWrapper>
        {props.resultMsg.map((el: IPropsData) => (
          <div key={uuidv4()}>
            {el.nickName === localStorage.getItem("user") ? (
              <S.Right>
                <S.Text ref={props.messagesEndRef}>
                  {el.nickName} : {el.message}
                </S.Text>
              </S.Right>
            ) : (
              <S.Left>
                <S.Text ref={props.messagesEndRef}>
                  {el.nickName} : {el.message}
                </S.Text>
              </S.Left>
            )}
          </div>
        ))}
      </S.MessageWrapper>
      <S.TalkWrite
        placeholder="채팅을 입력해주세요."
        onChange={props.onChangeMsg}
        value={props.msg}
      />
      <S.Button>메세지 보내기</S.Button>
    </S.ChatRoom>
  );
}
