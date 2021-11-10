import React, { useState, useEffect } from 'react'
import Players from './Players';

export default function Pregame({ player, gamesettings, updategamesettings, socket }) {

    let [loading, setLoading] = useState(true)

    function updateGameSetting(key, value) {
        const newGameSettings = {
            ...gamesettings,
            [key]: value
        }
        socket.emit('updateGameSettings', player.room, newGameSettings);
    }

    useEffect(() => {
        if (gamesettings) setLoading(false);
    }, [gamesettings])
    return (

        <div>
            {!loading && player.room && (
                <h1 className="text-black text-4xl"> {player.room} </h1>
            )}
            <div>

                {
                    !loading && player.host && (
                        <button
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
                        <label> {gamesettings.MAX_PLAYERS} </label>
                    )
                }
                {
                    !loading && player.host && (
                        <button
                            disabled={gamesettings.MAX_PLAYERS >= 8}
                            onClick={(e) => {
                                e.preventDefault();
                                updateGameSetting('MAX_PLAYERS', (gamesettings.MAX_PLAYERS + 1));
                            }}
                        > + </button>
                    )
                }
            </div>

            <div>
                {
                    !loading && player.host && (
                        <button
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
                        <label> {gamesettings.GAME_MODE} </label>
                    )
                }
                {
                    !loading && player.host && (
                        <button
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
            <div>
                {
                    !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                        <button
                            disabled={gamesettings.MAX_LIVES <= 1}
                            onClick={(e) => {
                                e.preventDefault();
                                updateGameSetting('MAX_LIVES', (gamesettings.MAX_LIVES - 1));
                            }}> - </button>
                    )
                }
                {
                    !loading && gamesettings.MAX_LIVES && gamesettings.GAME_MODE === 'lives' && (
                        <label> {gamesettings.MAX_LIVES} </label>
                    )
                }
                {
                    !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                        <button
                            disabled={gamesettings.MAX_LIVES >= 20}
                            onClick={(e) => {
                                e.preventDefault();
                                updateGameSetting('MAX_LIVES', (gamesettings.MAX_LIVES + 1));
                            }}> + </button>
                    )
                }

            </div>
            <div>
                {
                    !loading && player.host && (
                        <button
                            disabled={gamesettings.ANSWER_TIMER <= 5}
                            onClick={(e) => {
                                e.preventDefault();
                                updateGameSetting('ANSWER_TIMER', (gamesettings.ANSWER_TIMER - 5));
                            }}> - </button>
                    )
                }
                {
                    !loading && gamesettings.ANSWER_TIMER && (
                        <label> {gamesettings.ANSWER_TIMER} </label>
                    )
                }
                {
                    !loading && player.host && (
                        <button
                            disabled={gamesettings.ANSWER_TIMER >= 60}
                            onClick={(e) => {
                                e.preventDefault();
                                updateGameSetting('ANSWER_TIMER', (gamesettings.ANSWER_TIMER + 5));
                            }}> + </button>
                    )
                }

            </div>
            <div>
                {
                    !loading && player.host && (
                        <button
                            // disabled={gamesettings.PLAYERS.length < 2}
                            onClick={(e) => {
                                e.preventDefault();
                                socket.emit('startGame', gamesettings.ROOM)
                            }}>
                            Start Game
                        </button>
                    )
                }

            </div>
            {!loading && gamesettings.PLAYERS && (
                <Players players={gamesettings.PLAYERS} />
            )
            }
        </div>
    )
}
