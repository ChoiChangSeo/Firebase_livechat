import { db } from "../../pages/_app";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  Query,
} from "firebase/firestore";
import MainUI from "./MainPresenter";
import { MouseEvent, useEffect, useState } from "react";
import { resolve } from "path/posix";

interface IPropsData {
  id?: string;
  nickName?: string;
  email?: string;
}

export default function MainPage() {
  const [userList, setUserList] = useState<IPropsData[]>([]);
  const [makeRoom, setMakeRoom] = useState<boolean>(false);
  const [oneRoomId, setOneRoomId] = useState<string>("");
  const [fromChatRoom, setFromChatRoom] = useState<{}>([]);
  const [makeGroupRoom, setMakeGroupRoom] = useState<boolean>(false);
  const [groupMember, setGroupMember] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");

  const openOneRoom = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as Element).id;

    if (id.includes(",")) {
      const result = id.split(",");
      setGroupMember(result);
    } else {
      setOneRoomId((e.target as Element).id);
    }
    setMakeRoom(true);
  };

  const makeGroupChatRoom = () => {
    setMakeGroupRoom((prev) => !prev);
  };

  const onChangeGroupMember = (checked: boolean, id: string) => {
    if (checked) {
      setGroupMember([...groupMember, id]);
    } else {
      setGroupMember(groupMember.filter((el) => el !== id));
    }
  };

  const inviteGroupMember = () => {
    setMakeRoom(true);
    setMakeGroupRoom(false);
    setGroupMember([...groupMember, userName]);
  };

  useEffect(() => {
    const list: Query<DocumentData> = query(collection(db, "Users"));
    onSnapshot(list, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserList(result);
    });
    const q: Query<DocumentData> = query(
      collection(db, String(localStorage.getItem("user")))
    );
    onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(result);
      setFromChatRoom(result);
    });
    setUserName(String(localStorage.getItem("user")));
  }, []);
  return (
    <MainUI
      makeGroupRoom={makeGroupRoom}
      makeGroupChatRoom={makeGroupChatRoom}
      setGroupMember={setGroupMember}
      onChangeGroupMember={onChangeGroupMember}
      inviteGroupMember={inviteGroupMember}
      userList={userList}
      openOneRoom={openOneRoom}
      setMakeRoom={setMakeRoom}
      oneRoomId={oneRoomId}
      makeRoom={makeRoom}
      setOneRoomId={setOneRoomId}
      fromChatRoom={fromChatRoom}
      groupMember={groupMember}
      userName={userName}
    />
  );
}
