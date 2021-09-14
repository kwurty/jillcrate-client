import React, { useContext, useState, useRef, useEffect } from 'react';
import { SocketContext } from '../utilities/connect';
import { Redirect } from "react-router-dom";

export default function Join() {

    const socket = useContext(SocketContext);

    const [roomToJoin, setRoomToJoin] = useState('')
    const [username, setUsername] = useState('')
    const [isConnected, setIsConnected] = useState(socket.connected);
    // const [lastMessage, setLastMessage] = useState(null);

    const lastRoom = useRef('');
    const lastUsername = useRef(' ');

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', (message) => {
            setIsConnected(false);
            socket.connect();
        });
        socket.on('returnJoinedRoom', (room) => {
            console.dir(room);
        })
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    });

    function joinRoom() {
        socket.emit("joinRoom", roomToJoin, username);
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            <div className="bg-gray-800 rounded-lg px-6 py-6">
                <div>
                    <h1 className="pb-5 text-4xl text-white">Name:</h1>
                    <div className="">
                        <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength="8" onChange={(e) => {
                            const { value, maxLength } = e.target;
                            setUsername(value.slice(0, maxLength));
                        }} ref={lastUsername} />
                        <label htmlFor="name" className="text-white"> ({lastUsername.current.maxLength - username.length})</label>
                    </div>

                </div>
                <div>
                    <h1 className="py-5 text-4xl text-white">Enter Room Code:</h1>
                    <div className="">
                        <input type="text" className="rounded-md py-5 uppercase" value={roomToJoin} onChange={(e) => setRoomToJoin(e.target.value)} ref={lastRoom} />
                        <button className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner" onClick={joinRoom}> Join </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
