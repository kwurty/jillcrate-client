import React, { useContext, useState, useRef, useEffect } from 'react';
import { SocketContext } from '../utilities/connect';

export default function Players() {
    const socket = useContext(SocketContext);
    const [players, setPlayers] = useState()

    useEffect(() => {
        socket.emit('getPlayers');
        socket.on("returnPlayers", (currentPlayers) => {
            setPlayers(currentPlayers)
        })
    })
    return (
        <div>
            {players.map((player) => {
                return (
                    <div> {player.name}</div>
                )
            })}
        </div>
    )
}
