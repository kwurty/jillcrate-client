import React, { useState, useEffect } from 'react'
import { SocketContext } from '../utilities/connect'
import './Game.css';
import GameSpot from './BoardSpot';

export default function Game({ gamesettings, player, socket }) {

    let [answer, setAnswer] = useState('');
    let [winner, setWinner] = useState(null);
    let [gameover, setGameover] = useState(false);


    const submitAnswer = (answer) => {
        socket.emit('submitAnswer', gamesettings.ROOM, answer)
    }

    useEffect(() => {
        socket.on('gameover', (winner) => {
            setWinner(winner.name);
            setGameover(true);
        });
        socket.on('gamestart', () => {
            setWinner(null);
            setGameover(false);
        });
    }, [socket])
    if (gamesettings) {
        return (
            <div className="border border-gray-800 mx-4 my-4 py-5 h-screen">
                <div hidden={gameover}>
                    <h1>
                        {winner} WINS
                    </h1>
                </div>
                <div className="gameboard">
                    {
                        gamesettings.PLAYERS.map((player, index) => (
                            <GameSpot player={player} position={index} socket={socket} currentplayer={gamesettings.CURRENT_PLAYER} key={index}></GameSpot>
                        ))}

                    <div className="center">

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
