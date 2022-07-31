import { db, firebaseAuth } from "../../pages/_app";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  Query,
} from "firebase/firestore";
import MainUI from "./MainPresenter";
import { MouseEvent, useEffect, useState } from "react";
import { browserLocalPersistence } from "firebase/auth";

interface IPropsData {
  id?: string;
  nickName?: string;
  email?: string;
}

export default function MainPage() {
  const [userList, setUserList] = useState<IPropsData[]>([]);
  const [makeRoom, setMakeRoom] = useState<boolean>(false);
  const [chatRoomId, setChatRoomId] = useState("");
  const [oneRoomId, setOneRoomId] = useState("");
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
    setMakeRoom(true);
  };

  const openOneRoom = async (e: MouseEvent<HTMLButtonElement>) => {
    setOneRoomId((e.target as Element).id);
    setMakeRoom(true);
  };

  const result = async () => {
    console.log(localStorage.getItem("user"));
    const q: Query<DocumentData> = query(
      collection(db, `${localStorage.getItem("user")}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    fetchUserList();
    result();
  }, []);
  return (
    <MainUI
      userList={userList}
      openChatRoom={openChatRoom}
      openOneRoom={openOneRoom}
      setMakeRoom={setMakeRoom}
      oneRoomId={oneRoomId}
      makeRoom={makeRoom}
      chatRoomId={chatRoomId}
      setOneRoomId={setOneRoomId}
      setChatRoomId={setChatRoomId}
    />
  );
}
