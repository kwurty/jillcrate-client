import React, { useState, useEffect } from 'react'
import './Game.css';
import GameSpot from './BoardSpot';

export default function Game({ gamesettings, player, socket }) {

    let [answer, setAnswer] = useState('');
    let [winner, setWinner] = useState(null);
    let [textToShow, setTextToShow] = useState('');
    let [gameover, setGameover] = useState(false);

    const submitAnswer = (answer) => {
        socket.emit('submitAnswer', gamesettings.ROOM, answer);
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
        socket.on('pregameCountdown', (timeleft) => {
            setTextToShow(`Game starts in ${timeleft}`);
            if (timeleft === 1) {
                const timer = setTimeout(() => {
                    setTextToShow("");
                }, 1000);
                return () => clearTimeout(timer);
            }
        })
        socket.on('correctAnswer', (currentplayer, firstname, lastname) => {
            setTextToShow(`Last Answer: ${firstname} ${lastname}`);
        })
        socket.on('timeover', () => {
            setAnswer("");
        });
    }, [socket])
    if (gamesettings) {
        return (
            <div className="border border-gray-800 px-3 mx-4 my-4 py-5 min-h-full">
                <div className="gameboard">
                    {
                        gamesettings.PLAYERS.map((player, index) => (
                            <GameSpot setanswer={setAnswer} player={player} position={index} socket={socket} currentplayer={gamesettings.CURRENT_PLAYER} key={index}></GameSpot>
                        ))}

                    <div className="center">
                        {gameover && (
                            <div className="flex flex-col">
                                <h1 className="self-center text-white text-4xl">
                                    {winner} WINS
                                </h1>
                                {player.host ? (
                                    <button className="rounded border mx-5 px-5 py-2 mt-5 bg-blue-400 border-gray-500 text-white shadow-inner" onClick={(e) => {
                                        e.preventDefault();
                                        socket.emit('startGame', gamesettings.ROOM);
                                    }}> Play Again? </button>
                                ) : ""}
                            </div>
                        )}
                        {!gameover && (
                            <div>
                                {textToShow}
                            </div>
                        )}
                        <div>
                            {!gameover && gamesettings.TIME_LEFT && (
                                <div> {gamesettings.TIME_LEFT}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center bg-gray-800 rounded-lg h-24" >
                    {gamesettings && gamesettings.CURRENT_PLAYER !== null && gamesettings.STATUS === 2 &&
                        player.id === gamesettings.PLAYERS[gamesettings.CURRENT_PLAYER]['id'] ? (
                        <div className="self-center">

                            <label htmlFor="answer" className="text-white text-2xl px-2 justify-center self-center" disabled={false}>Answer:</label>
                            <input className="border rounded-md h-12 w-80" type="text" name="answer" id="answer" value={answer}
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
                            <button className="rounded-lg bg-blue-500 text-white px-4 h-12 ml-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    submitAnswer(answer);
                                }}>
                                Submit
                            </button>
                        </div>
                    ) : gamesettings && gamesettings.STATUS === 2 ? (
                        <div>
                        </div>
                    ) : (
                        <div></div>
                    )
                    }

                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
