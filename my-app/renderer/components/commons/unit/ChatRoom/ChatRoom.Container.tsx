import styled from "@emotion/styled"
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { db, firebaseAuth } from "../../../../pages/_app"
import { v4 as uuidv4 } from 'uuid';

const UserList = styled.div`
    color: red;
    font-size: 15px;
`
const ChatRoom = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid blue;
`

export default function ChatRoomPage(props){
    const [msg, setMsg] = useState("")
    const [resultMsg,setResultMsg] = useState([])
    const onChangeMsg = (e) => {
        setMsg(e.target.value)
       }

       const sendMsg = async (e) => {
           const result = await addDoc(collection(db,props.chatRoomId),{
               nickName: firebaseAuth.currentUser.displayName,
               message: msg,
               timestamp : new Date()
           })
       }
       useEffect(()=>{
      const q = query(collection(db, props.chatRoomId),orderBy("timestamp","desc"))
      onSnapshot(q,(querySnapshot) => {
          const result = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }))
          setResultMsg(result)
      })
},[onSnapshot])  

    return(
        <div>
        <ChatRoom>
            <input onChange={onChangeMsg}/>
            <button onClick={sendMsg}>메세지 보내기</button>
            {resultMsg.map((el)=>(
                <div key={uuidv4()}>
                    <div>{el.nickName}:{el.message}</div>
                </div>
            ))}
        </ChatRoom>          
        </div>
    )
}