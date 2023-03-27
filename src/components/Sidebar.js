import './Sidebar.css'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton } from '@mui/material'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import SidebarChat from './SidebarChat'
import db, { auth } from '../firebase/firebase'
import {useSelector } from 'react-redux'

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const user = useSelector(state => state.user)
    const [logout, setLogout] = useState(false)

    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot =>{
            setRooms(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            )))
        })
    })

    const handleLogout = () =>{
        setLogout(!logout)
    }
    const finalLogout = () =>{
        auth.signOut( alert("Logout succesfully"))
        window.location.reload()
    }

  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user?.photoURL} />
            <div className='sidebar__headerRight'>
                <IconButton>
                    <DonutLarge />
                </IconButton>
                <IconButton>
                    <Chat />
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <MoreVert />
                </IconButton>
                {
                    logout && <div className='logout'>
                                <Button color='primary' onClick={finalLogout} >Logout</Button>
                              </div>
                }
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlined />
                <input placeholder='Search or start new chat' type="text" />
            </div>
        </div>
        <div className='sidebar__chats'>
            <SidebarChat addNewChat={true} />
            { rooms.map(room=> <SidebarChat key={room.id} id={room.id} name={room.data.name} />)} 
        </div>
    </div>
  )
}

export default Sidebar