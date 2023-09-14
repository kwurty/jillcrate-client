// Import basic React components 
import React, { useState, useEffect } from 'react';
import Join from './Join';
import JoinHostSelection from './JoinHostSelection';
import Host from './Host';
// Import global socket component

export default function Login({ player, updateplayer, socket }) {

    let [join, setJoin] = useState(false);
    let [username, setUsername] = useState('');
    let [room, setRoom] = useState('');
    let [alertTriggered, setAlertTriggered] = useState(false);
    let [message, setMessage] = useState('');



    useEffect(() => {
        socket.on("returnFailedRoomJoin", (message) => {
            setMessage(message);
            setAlertTriggered(true);
            const timer = setTimeout(() => {
                setAlertTriggered(false)
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        })
        socket.on("returnJoinedRoom", (room, name) => {
            updateplayer({ ...player, room, name, host: false });
        })
    }, [socket, player, updateplayer])

    // insert useeffect for the alert message here
    useEffect(() => {

    })

    return (

        <div className='h-auto'>
            {

                <div className={`flex items-center bg-yellow-600 text-white text-sm font-bold px-4 py-3 transition-all ease-in absolute duration-75 left-1/3 w-1/3 ${alertTriggered ? 'opacity-90' : 'hidden opacity-0'}`} role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                    <p className="text-center">{message}</p>
                </div>

            }
            {(!player.name && !player.host && !room && !join && (
                <JoinHostSelection updateplayer={updateplayer} player={player} setJoin={setJoin}  ></JoinHostSelection>
            )) || ""}
            { (player.host && !join && (
                <Host socket={socket} player={player} updateplayer={updateplayer}></Host>
            )) || ""}
            {(!player.name & !player.host && join && (
                <Join socket={socket} room={room} username={username} setUsername={setUsername} setRoom={setRoom} setJoin={setJoin}></Join>
            )) || ""}
        </div>
    )
}