import React, { useState, useEffect } from 'react'

export default function Pregame({ player, gamesettings, updategamesettings, socket }) {

    let [loading, setLoading] = useState(true)

    function updateGameSetting(key, value) {
        socket.emit('updateGameSettings', player.room, key, value);
    }

    useEffect(() => {
        if (gamesettings) setLoading(false);
    }, [gamesettings])
    return (

        <div className="pt-4 pb-4">
            {!loading && player.room && (
                <div className="flex flex-col gap-0">

                    <div className="text-white p-0 m-0"> Room Code:</div>
                    <div className="text-white m-0 p-0"> {player.room} </div>
                </div>
            )}
            <div className="flex flex-col gap-1 max-w-xl w-100 px-4 bg-gray-800 rounded-lg py-4">
                <h2 className="text-white text-m p-0 m-0"> Max Players:</h2>
                <div className={`flex rounded-full bg-gray-600 ${player.host ? 'justify-between' : 'justify-center'}`}>

                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.MAX_PLAYERS <= 2}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('MAX_PLAYERS', (gamesettings.MAX_PLAYERS - 1));
                                }}
                            > - </button>
                        )
                    }
                    {
                        !loading && gamesettings.MAX_PLAYERS && (
                            <div className="text-white flex self-center"> {gamesettings.MAX_PLAYERS} </div>
                        )
                    }
                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.MAX_PLAYERS >= 8}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('MAX_PLAYERS', (gamesettings.MAX_PLAYERS + 1));
                                }}
                            > + </button>
                        )
                    }
                </div>
                <h2 className="text-white text-m p-0 m-0"> Game mode:</h2>
                <div className={`flex rounded-full bg-gray-600 ${player.host ? 'justify-between' : 'justify-center'}`}>
                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let n = gamesettings.GAME_TYPES.indexOf(gamesettings.GAME_MODE)
                                    if (n === 0) {
                                        updateGameSetting('GAME_MODE', gamesettings.GAME_TYPES[gamesettings.GAME_TYPES.length - 1])
                                    } else {
                                        updateGameSetting('GAME_MODE', gamesettings.GAME_TYPES[n - 1])
                                    }
                                }}
                            > &#8592; </button>
                        )
                    }
                    {
                        !loading && gamesettings.GAME_MODE && (
                            <div className="text-white flex self-center">
                                {gamesettings.GAME_MODE}
                            </div>
                        )
                    }
                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let n = gamesettings.GAME_TYPES.indexOf(gamesettings.GAME_MODE)
                                    if (n === gamesettings.GAME_TYPES.length - 1) {
                                        updateGameSetting('GAME_MODE', gamesettings.GAME_TYPES[0])
                                    } else {
                                        updateGameSetting('GAME_MODE', gamesettings.GAME_TYPES[n + 1])
                                    }
                                }}
                            > &#8594; </button>
                        )
                    }
                </div>
                {
                    !loading && gamesettings.GAME_MODE === 'lives' && (

                        <h2 className="text-white text-m p-0 m-0"> Lives:</h2>
                    )
                }
                <div className={`flex rounded-full bg-gray-600 ${player.host ? 'justify-between' : 'justify-center'}`}>
                    {
                        !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.MAX_LIVES <= 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('MAX_LIVES', (gamesettings.MAX_LIVES - 1));
                                }}> - </button>
                        )
                    }
                    {
                        !loading && gamesettings.MAX_LIVES && gamesettings.GAME_MODE === 'lives' && (
                            <div className="text-white flex self-center">{gamesettings.MAX_LIVES} </div>
                        )
                    }
                    {
                        !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.MAX_LIVES >= 20}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('MAX_LIVES', (gamesettings.MAX_LIVES + 1));
                                }}> + </button>
                        )
                    }

                </div>

                <h2 className="text-white text-m p-0 m-0"> Time to Answer:</h2>
                <div className={`flex rounded-full bg-gray-600 ${player.host ? 'justify-between' : 'justify-center'}`}>
                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.ANSWER_TIMER <= 5}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('ANSWER_TIMER', (gamesettings.ANSWER_TIMER - 5));
                                }}> - </button>
                        )
                    }
                    {
                        !loading && gamesettings.ANSWER_TIMER && (
                            <div className="text-white flex self-center">{gamesettings.ANSWER_TIMER} seconds </div>
                        )
                    }
                    {
                        !loading && player.host && (
                            <button
                                className="bg-gray-700 rounded-full w-8 h-8 text-white"
                                disabled={gamesettings.ANSWER_TIMER >= 60}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateGameSetting('ANSWER_TIMER', (gamesettings.ANSWER_TIMER + 5));
                                }}> + </button>
                        )
                    }

                </div>
                {
                    !loading && player.host && (
                        <div className="py-5">
                            <button
                                className="rounded border mx-5 px-10 py-5 bg-blue-400 border-gray-500 text-white shadow-inner"
                                disabled={gamesettings.PLAYERS.length < 2 || gamesettings.STATUS !== 0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    socket.emit('startGame', gamesettings.ROOM)
                                }}>
                                Start Game
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
