import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../utilities/connect';

export default function DisplaySettings() {
    const socket = useContext(SocketContext);
    const [gameSettings, setGameSettings] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {

        });

        socket.on('returnGameSettings', (settings) => {
            setGameSettings(JSON.parse(settings));
        });

    }, []);
    return (
        <div>
            {gameSettings.MAX_PLAYERS}
        </div>
    )
}
