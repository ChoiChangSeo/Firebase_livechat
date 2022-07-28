import { db } from "../../pages/_app";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import MainUI from "./MainPresenter";
import { useEffect, useState } from 'react';

export default function MainPage(){
const [userList, setUserList] = useState([])
const [makeRoom,setMakeRoom] = useState(false)
const [chatRoomId,setChatRoomId] = useState("")

const fetchUserList = async () => {
const list = await getDocs(collection(db, "Users"))
const data = list.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
}))
setUserList(data)
}
const openChatRoom = async (e) => {
    setChatRoomId(e.target.id)
    setMakeRoom((prev) => !prev)
}


useEffect(()=>{
    fetchUserList()
},[])
    return <MainUI userList={userList} openChatRoom={openChatRoom} makeRoom={makeRoom} chatRoomId={chatRoomId}/>
}