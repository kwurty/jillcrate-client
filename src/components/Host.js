// eslint-disable-next-line
import React, { useContext, useState, useRef, useEffect } from 'react';
import { SocketContext } from '../utilities/connect';

export default function Host() {
    const socket = useContext(SocketContext);
    const [gameCode, setGameCode] = useState('');
    const [gameSettings, setGameSettings] = useState(false);


    function updateGameSettings(key, value) {
        const newObject = {
            ...gameSettings,
            [key]: value
        }
        setGameSettings(newObject)
    }


    useEffect(() => {
        console.log("generate");
        socket.emit("generateRoom");

        socket.on('connect', () => {
        })
        socket.on('returnRoomCode', (res) => {
            setGameCode(res);
        })
        socket.on('returnGameSettings', (settings) => {
            setGameSettings(JSON.parse(settings));
        })
        socket.on('userJoinRoom', (players) => {

        })

    }, []);

    useEffect(() => {
        socket.emit('updateGameSettings', gameCode, JSON.stringify(gameSettings));
    }, [gameSettings])
    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">

            <div>
                <h1 className="text-white text-4xl"> {gameCode} </h1>
            </div>
            {gameSettings ?
                (

                    <form>
                        Max Players:
                        <select value={gameSettings.MAX_PLAYERS} onChange={(e) => {
                            updateGameSettings('MAX_PLAYERS', parseInt(e.target.value));
                        }}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>

                        Game Mode:
                        <select value={gameSettings.GAME_MODE} onChange={(e) => {
                            updateGameSettings('GAME_MODE', e.target.value);
                        }}>

                            <option value="lives"> Limited Lives </option>
                            <option value="unlimited"> Unlimited Play </option>
                        </select>

                        {
                            gameSettings.GAME_MODE === "lives" ?
                                (
                                    <div>
                                        Number of lives:
                                        <input type="number" min="1" max="8" value={gameSettings.MAX_LIVES} onChange={(e) => {
                                            updateGameSettings('MAX_LIVES', parseInt(e.target.value));
                                        }}>
                                        </input>
                                    </div>
                                )
                                :
                                null
                        }

                        <div>
                            Time to Answer:
                            <input type="number" min="5" max="60" value={gameSettings.ANSWER_TIMER} onChange={(e) => {
                                updateGameSettings('ANSWER_TIMER', parseInt(e.target.value));
                            }}>
                            </input> seconds
                        </div>
                        <div className="block">
                            Max players - {gameSettings.MAX_PLAYERS}
                        </div>
                        <div className="block">
                            Time to Answer - {gameSettings.ANSWER_TIMER}
                        </div>
                        <div className="block">
                            Game Mode? - {gameSettings.GAME_MODE}
                        </div>

                        <div>
                            {
                                gameSettings.PLAYERS.map((player) => {
                                    return (
                                        <div>
                                            {player.name}
                                        </div>
                                    )
                                })}
                        </div>

                        <div onClick={(e) => {
                            e.preventDefault();
                            socket.emit("viewGameSettings", gameCode);
                        }}>
                            test ME!
                        </div>

                    </form>

                )
                :
                (<div></div>)
            }
            <div>
                Players in the lobby should be here
            </div>
        </div>
    )
}
