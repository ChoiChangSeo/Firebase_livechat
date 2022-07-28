import styled from "@emotion/styled"
import ChatRoomPage from "../commons/unit/ChatRoom/ChatRoom.Container"

const UserList = styled.div`
    color: red;
    font-size: 15px;
`
const ChatRoom = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid blue;
`

export default function MainUI(props){
    
    return(
        <div>
        {props.userList.map((el)=>(
            <div key={el.id}>
                <UserList>{el.nickName}</UserList>
                <button id={el.id} onClick={props.openChatRoom}>채팅참여</button> 
            </div>
        ))}
          {props.makeRoom &&(
                <ChatRoomPage chatRoomId={props.chatRoomId}/>
                )}   
        </div>
    )
}