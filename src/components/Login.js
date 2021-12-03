// Import basic React components 
import React, { useState, useEffect } from 'react';
// Import global socket component

export default function Login({ player, updateplayer, socket }) {

    let [join, setJoin] = useState(false);
    let [username, setUsername] = useState('');
    let [room, setRoom] = useState('');
    let [alertTriggered, setAlertTriggered] = useState(false);
    let [message, setMessage] = useState('');

    const maxlength = 8;

    const joinRoom = () => {
        if (username.length > 0) {
            socket.emit('joinRoom', room, username);
        }
    }

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
        socket.on("returnJoinedRoom", () => {
            updateplayer({ ...player, name: username, room: room, host: false })
        })
    }, [socket])

    // insert useeffect for the alert message here
    useEffect(() => {

    })

    return (

        <div>
            {

                <div className={`flex items-center bg-yellow-600 text-white text-sm font-bold px-4 py-3 transition-all ease-in absolute duration-75 left-1/3 w-1/3 ${alertTriggered ? 'opacity-90' : 'opacity-0'}`} role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                    <p className="text-center">{message}</p>
                </div>

            }
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
                            <div>

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
                                <div className="w-100 flex justify-center pt-4">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setJoin(false);
                                    }} className="w-12 h-12 flex rounded-full items-center justify-center bg-blue-400 text-white" > &#8592; </button>
                                </div>
                            </div>
                        )
                }


            </div>
        </div>
    )
}