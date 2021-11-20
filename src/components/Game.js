import React, { useState, useEffect } from 'react'
import { SocketContext } from '../utilities/connect'
import './Game.css';
export default function Game({ gamesettings, player, socket }) {

    let [answer, setAnswer] = useState('');
    const submitAnswer = (answer) => {
        socket.emit('submitAnswer', gamesettings.ROOM, answer)
    }

    const currentPlayer = () => {
        if (gamesettings.CURRENT_PLAYER) {
            return (
                <div> {gamesettings.PLAYERS[gamesettings.CURRENT_PLAYER]['name']}</div>
            )
        }
    }



    if (gamesettings) {
        return (
            <div>
                <div className="gameboard">

                    {
                        gamesettings.PLAYERS.map((player, index) => (
                            <div key={player.id} className={'player' + index}>
                                {player.name}
                            </div>
                        ))}

                    <div className="center">
                        CURRENT PLAYER:
                        {
                            // gamesettings.CURRENT_PLAYER ? gamesettings.PLAYERS[gamesettings.CURRENT_PLAYER]['name'] : ""
                        }
                    </div>
                </div>
                <div className="">
                    <label htmlFor="answer">Answer:</label>
                    <input className="border" type="text" name="answer" id="answer" value={answer}
                        onChange={(e) => {
                            const { value } = e.target;
                            setAnswer(value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submitAnswer(answer);
                                setAnswer('');
                            }
                        }} />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
