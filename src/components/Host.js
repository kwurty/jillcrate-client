// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react';

export default function Host({ socket, player, updateplayer }) {
    const [username, setUsername] = useState('');
    const maxlength = 8;

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            <div>
                <div>
                    <h1 className="pb-5 text-4xl text-white">Name:</h1>
                    <div className="flex align-middle justify-center">
                        <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength={maxlength} onChange={(e) => {
                            const { value } = e.target;
                            let tempUserName = value.slice(0, maxlength).toUpperCase();
                            setUsername(tempUserName);

                        }} />
                        <label htmlFor="name" className="text-white self-center pl-1"> ({maxlength - username.length})</label>
                        <button className="border rounded-lg bg-blue-400 mx-5 px-10 py-5" onClick={(e) => {
                            e.preventDefault();
                            updateplayer((player) => {
                                return { ...player, name: username }
                            });
                            socket.emit('generateRoom', username);
                        }}> Host </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
