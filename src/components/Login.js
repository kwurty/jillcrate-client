// Import basic React components 
import React, { useContext, useState, useEffect } from 'react';
// Import router components
import { Link, Redirect } from 'react-router-dom';
// Import global socket component
import { SocketContext } from '../utilities/connect';

export default function Login() {
    // Get the socket
    const socket = useContext(SocketContext);

    const [isConnected, setIsConnected] = useState(socket.connected);
    // const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', (message) => {
            setIsConnected(false);
            socket.connect();
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    });

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">
            <h1 className="py-5 text-4xl text-white">Name Game</h1>
            {isConnected ?
                (
                    <div className="">
                        <Link to="/create"> <button className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner"> Host </button> </Link>
                        <Link to="/join"><button className="rounded border mx-5 px-10 py-5 bg-blue-400 text-white shadow-inner"> Join </button> </Link>
                    </div>
                )

                :
                (
                    <div>
                        Establishing connection...
                    </div>
                )
            }
        </div>
    )
}