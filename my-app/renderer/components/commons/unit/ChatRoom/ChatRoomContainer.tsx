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
    await addDoc(collection(db, props.chatRoomId), {
      nickName: firebaseAuth.currentUser?.displayName,
      message: msg,
      timestamp: new Date(),
    });
    setMsg("");
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    const q: Query<DocumentData> = query(
      collection(db, props.chatRoomId),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResultMsg(result.reverse());
    });
  }, [onSnapshot]);

  const closeChatRoom = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) {
      props.setMakeRoom(false);
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
