import './Chat.css'
import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import db from '../firebase/firebase'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {serverTimestamp} from 'firebase/firestore'

const Chat = () => {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)


    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>(
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc")
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [roomId])


    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500))
        },[])

    const sendMessage = (e) =>{
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp : serverTimestamp()    
        })
        setInput('')
  }
  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
            <div className='chat__headerinfo'>
                <h2>{roomName}</h2>
                <p>Last Seen {" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>
            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
        <div className="chat__body" >
            {messages.map(message =>(
            <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`}>
            <span className='chat__name'>{message.name}</span>
                {message.message}
            <span className='chat__timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
            </p>
            ))}
       
        </div>
        <div className='chat__footer'>
        <InsertEmoticon />
            <form >
                <input type="text" placeholder='Type a message' value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={sendMessage} >Send</button>
            </form>
            <Mic />
        </div>
    </div>
  )
}

export default Chat