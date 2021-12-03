// Import basic React components 
import React, { useState, useEffect } from 'react';
// Import global socket component

export default function Login({ player, updateplayer, socket }) {

    let [join, setJoin] = useState(false);
    let [username, setUsername] = useState('');
    let [room, setRoom] = useState('');
    const maxlength = 8;

    const joinRoom = (roomcode) => {
        if (username.length > 0) {
            socket.emit('joinRoom', room, username);
        }
    }

    useEffect(() => {
        socket.on("returnFailedRoomJoin", (message) => {
            console.log(message);
        })
        socket.on("returnJoinedRoom", () => {
            updateplayer({ ...player, name: username, room: room, host: false })
        })
    }, [socket])

    // insert useeffect for the alert message here
    useEffect(() => {

    })

    return (

        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            <h1 className="py-5 text-4xl text-white">Name Game</h1>

            {
                !join ?
                    (
                        <div className="">
                            <button
                                className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner"
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateplayer({ ...player, host: true });
                                }}>

                                Host Game

                            </button>
                            <button
                                className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setJoin(true);
                                }}>

                                Join Game

                            </button>
                        </div>)

                    :

                    (
                        <div className="bg-gray-800 rounded-lg px-6 py-6">
                            <div>
                                <h1 className="pb-5 text-4xl text-white">Name:</h1>
                                <div className="">
                                    <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength={maxlength} onChange={(e) => {
                                        const { value } = e.target;
                                        setUsername(value.slice(0, maxlength).toUpperCase());
                                    }} />
                                    <label htmlFor="name" className="text-white"> ({maxlength - username.length})</label>
                                </div>

                            </div>
                            <div>
                                <h1 className="py-5 text-4xl text-white">Enter Room Code:</h1>
                                <div className="">
                                    <input type="text" className="rounded-md py-5 uppercase" value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} />
                                    <button className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner" onClick={(e) => { e.preventDefault(); joinRoom() }}> Join </button>
                                </div>
                            </div>
                        </div>
                    )
            }


        </div>
    )
}