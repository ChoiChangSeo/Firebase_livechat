import { db } from "../../pages/_app";
import {
  collection,
  collectionGroup,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";
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
  const [oneRoomId, setOneRoomId] = useState("");
  const [fromChatRoom, setFromChatRoom] = useState([]);
  const [makeGroupRoom, setMakeGroupRoom] = useState(false);
  const [groupMember, setGroupMember] = useState([]);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const fetchUserList = async () => {
    const list = await getDocs(collection(db, "Users"));
    const data = list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUserList(data);
  };

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

  const onChagneGroupMember = (checked: boolean, id: string) => {
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
    fetchUserList();
    const q: Query<DocumentData> = query(
      collection(db, localStorage.getItem("user"))
    );
    onSnapshot(q, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFromChatRoom(result);
      console.log(result);
    });
    setUserName(localStorage.getItem("user"));
  }, []);
  return (
    <MainUI
      makeGroupRoom={makeGroupRoom}
      makeGroupChatRoom={makeGroupChatRoom}
      onChagneGroupMember={onChagneGroupMember}
      inviteGroupMember={inviteGroupMember}
      userList={userList}
      openOneRoom={openOneRoom}
      setMakeRoom={setMakeRoom}
      oneRoomId={oneRoomId}
      makeRoom={makeRoom}
      chatRoomId={chatRoomId}
      setOneRoomId={setOneRoomId}
      setChatRoomId={setChatRoomId}
      fromChatRoom={fromChatRoom}
      groupMember={groupMember}
      userName={userName}
    />
  );
}
