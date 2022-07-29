import { db } from "../../pages/_app";
import { collection, getDocs } from "firebase/firestore";
import MainUI from "./MainPresenter";
import { MouseEvent, useEffect, useState } from "react";

interface IPropsData {
  id?: string;
  nickName?: string;
  email?: string;
}

export default function MainPage() {
  const [userList, setUserList] = useState<IPropsData[]>([]);
  const [makeRoom, setMakeRoom] = useState<boolean>(false);
  const [chatRoomId, setChatRoomId] = useState("");

  const fetchUserList = async () => {
    const list = await getDocs(collection(db, "Users"));
    const data = list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUserList(data);
  };
  const openChatRoom = async (e: MouseEvent<HTMLButtonElement>) => {
    setChatRoomId((e.target as Element).id);
    setMakeRoom((prev) => !prev);
  };
  

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <MainUI
      userList={userList}
      openChatRoom={openChatRoom}
      setMakeRoom={setMakeRoom}
      makeRoom={makeRoom}
      chatRoomId={chatRoomId}
    />
  );
}
