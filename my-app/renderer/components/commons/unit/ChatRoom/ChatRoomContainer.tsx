import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  Query,
  query,
} from "firebase/firestore";
import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  FormEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import { db, firebaseAuth } from "../../../../pages/_app";
import ChatRoomUI from "./ChatRoomPresenter";

interface IPropsChatRoomPage {
  chatRoomId?: string;
  setMakeRoom: Dispatch<SetStateAction<boolean>>;
}
interface IPropsData {
  id?: string;
  nickName?: string;
  message?: string;
}

export default function ChatRoomPage(props: IPropsChatRoomPage) {
  const [msg, setMsg] = useState("");
  const [resultMsg, setResultMsg] = useState<IPropsData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onChangeMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const sendMsg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.oneRoomId) {
      await addDoc(
        collection(
          db,
          `${props.oneRoomId}/${localStorage.getItem("user")}/chat`
        ),
        {
          nickName: localStorage.getItem("user"),
          message: msg,
          timestamp: new Date(),
        }
      );
      setMsg("");
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else {
      await addDoc(collection(db, props.chatRoomId), {
        nickName: localStorage.getItem("user"),
        message: msg,
        timestamp: new Date(),
      });
      setMsg("");
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    // const oneRoom = `${localStorage.getItem("user")}to${props.oneRoomId}`;
    const q: Query<DocumentData> = query(
      collection(
        db,
        props.chatRoomId ||
          `${props.oneRoomId}/${localStorage.getItem("user")}/chat`
      ),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResultMsg(result.reverse());
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [onSnapshot]);

  const closeChatRoom = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) {
      props.setMakeRoom(false);
      props.setOneRoomId("");
      props.setChatRoomId("");
    }
  };
  return (
    <ChatRoomUI
      closeChatRoom={closeChatRoom}
      sendMsg={sendMsg}
      resultMsg={resultMsg}
      messagesEndRef={messagesEndRef}
      onChangeMsg={onChangeMsg}
      msg={msg}
    />
  );
}
