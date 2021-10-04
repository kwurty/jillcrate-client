// eslint-disable-next-line
import React, { useContext, useState, useRef, useEffect } from 'react';
import Players from './Players';
import { SocketContext } from '../utilities/connect';

export default function Host() {
    const socket = useContext(SocketContext);
    const [gameCode, setGameCode] = useState('');
    const [gameSettings, setGameSettings] = useState(false);
    const [displaySettings, setDisplaySettings] = useState(false);
    const [username, setUsername] = useState('');
    const [submittedName, setSubmittedName] = useState(false);

    const lastUsername = useRef(' ');

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
        console.log("generate");
        socket.emit("generateRoom");

        socket.on('connect', () => {
        })
        socket.on('returnRoomCode', (res) => {
            // When the room code is returned, we are going to set the room code then request the game settings
            setGameCode(res);
            socket.emit('viewGameSettings', gameCode);
        })
        socket.on('returnGameSettings', (settings) => {
            setDisplaySettings(JSON.parse(settings));
        })
        socket.on('userJoinRoom', (players) => {

        })

    }, []);

    useEffect(() => {
        socket.emit('updateGameSettings', gameCode, JSON.stringify(gameSettings));
    }, [gameSettings]);

    useEffect(() => {
        setDisplaySettings(gameSettings)
    }, [gameSettings]);

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-500">

            {
                submittedName && gameSettings ?
                    <div>
                        <div>
                            <h1 className="text-white text-4xl"> {gameCode} </h1>
                        </div>
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
                                Max players - {displaySettings.MAX_PLAYERS}
                            </div>
                            <div className="block">
                                Time to Answer - {displaySettings.ANSWER_TIMER}
                            </div>
                            <div className="block">
                                Game Mode? - {displaySettings.GAME_MODE}
                            </div>


                            <div onClick={(e) => {
                                e.preventDefault();
                                socket.emit("viewGameSettings", gameCode);
                            }}>
                                test ME!
                            </div>

                        </form>

                    </div>
                    :
                    <div>
                        <div>
                            <h1 className="pb-5 text-4xl text-white">Name:</h1>
                            <div className="flex align-middle justify-center">
                                <input type="text" id="name" className="rounded-md py-5 w-11/12 uppercase" value={username} maxLength="8" onChange={(e) => {
                                    const { value, maxLength } = e.target;
                                    setUsername(value.slice(0, maxLength).toUpperCase());
                                }} ref={lastUsername} />
                                <label htmlFor="name" className="text-white self-center pl-1"> ({lastUsername.current.maxLength - username.length})</label>
                                <button className="border rounded-lg bg-blue-400 mx-5 px-10 py-5" onClick={() => {
                                    setHostName();
                                }}> Host </button>
                            </div>

                        </div>
                    </div>
            }


            {
                gameSettings.PLAYERS && gameSettings.PLAYERS.length > 0 &&
                <div>
                    <Players players={gameSettings.PLAYERS} />
                </div>
            }
        </div>
    )
}
