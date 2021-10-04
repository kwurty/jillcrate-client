import React, { useContext, useState, useRef, useEffect } from 'react';
import { SocketContext } from '../utilities/connect';
import { Redirect } from "react-router-dom";
import Players from './Players';
import DisplaySettings from './DisplaySettings';

export default function Join() {

    const socket = useContext(SocketContext);

    const [roomToJoin, setRoomToJoin] = useState('');
    const [gameSettings, setGameSettings] = useState(null);
    const [username, setUsername] = useState('');
    const [inRoom, setInRoom] = useState(false);
    // const [lastMessage, setLastMessage] = useState(null);

    const lastRoom = useRef('');
    const maxLength = 8;
    const lastUsername = useRef('');

    useEffect(() => {
        socket.on('connect', () => {

        });
        socket.on('returnJoinedRoom', () => {
            setInRoom(true);
            socket.emit('viewGameSettings', roomToJoin);
        });

        socket.on('returnGameSettings', (settings) => {
            setGameSettings(JSON.parse(settings));
        });

    }, []);

    function joinRoom() {
        socket.emit("joinRoom", roomToJoin, username);
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            {
                inRoom && gameSettings ?
                    (
                        <div>
                            <DisplaySettings gameSettings={gameSettings} />
                            <Players players={gameSettings.PLAYERS} />
                        </div>
                    )
                    :
                    <div className="bg-gray-800 rounded-lg px-6 py-6">
                        <div>
                            <h1 className="pb-5 text-4xl text-white">Name:</h1>
                            <div className="">
                                <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength="8" onChange={(e) => {
                                    const { value, maxLength } = e.target;
                                    setUsername(value.slice(0, maxLength).toUpperCase());
                                }} ref={lastUsername} />
                                <label htmlFor="name" className="text-white"> ({maxLength - username.length})</label>
                            </div>

                        </div>
                        <div>
                            <h1 className="py-5 text-4xl text-white">Enter Room Code:</h1>
                            <div className="">
                                <input type="text" className="rounded-md py-5 uppercase" value={roomToJoin} onChange={(e) => setRoomToJoin(e.target.value)} ref={lastRoom} />
                                <button className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner" onClick={() => joinRoom()}> Join </button>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}
