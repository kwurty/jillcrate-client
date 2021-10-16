// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';
import Players from './Players';
import { Redirect } from "react-router-dom";
import { SocketContext } from '../utilities/connect';

export default function Host({ player, updateplayer, updategamesettings, socket }) {
    const [gameSettings, setGameSettings] = useState(false);
    const [username, setUsername] = useState('');
    const maxlength = 8;


    function updateGameSettings(key, value) {
        const newObject = {
            ...gameSettings,
            [key]: value
        }
        setGameSettings(newObject)
    }

    function setHostName() {
        updateGameSettings('PLAYERS', [{
            id: socket.id,
            name: username
        }]);
        setSubmittedName(true);
    }


    useEffect(() => {
        socket.on('returnRoomCode', (roomcode, gamesettings) => {
            updateplayer({
                ...player,
                name: username,
                room: roomcode
            });
            updategamesettings(gamesettings)
        })
    }, []);

    // useEffect(() => {
    //     socket.emit('updateGameSettings', roomCode, JSON.stringify(gameSettings));
    // }, [gameSettings]);

    // useEffect(() => {
    //     setDisplaySettings(gameSettings)
    // }, [gameSettings]);

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            <div>
                <div>
                    <h1 className="pb-5 text-4xl text-white">Name:</h1>
                    <div className="flex align-middle justify-center">
                        <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength={maxlength} onChange={(e) => {
                            const { value } = e.target;
                            setUsername(value.slice(0, maxlength).toUpperCase());
                        }} />
                        <label htmlFor="name" className="text-white self-center pl-1"> ({maxlength - username.length})</label>
                        <button className="border rounded-lg bg-blue-400 mx-5 px-10 py-5" onClick={(e) => {
                            e.preventDefault();
                            socket.emit("generateRoom", username);
                        }}> Host </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
