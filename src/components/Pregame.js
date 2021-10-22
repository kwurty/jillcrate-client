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
                        <button> &#8592; </button>
                    )
                }
                {
                    !loading && gamesettings.GAME_MODE && (
                        <label> {gamesettings.GAME_MODE} </label>
                    )
                }
                {
                    !loading && player.host && (
                        <button> &#8594; </button>
                    )
                }
            </div>
            <div>
                {
                    !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                        <button> - </button>
                    )
                }
                {
                    !loading && gamesettings.MAX_LIVES && gamesettings.GAME_MODE === 'lives' && (
                        <label> {gamesettings.MAX_LIVES} </label>
                    )
                }
                {
                    !loading && player.host && gamesettings.GAME_MODE === 'lives' && (
                        <button> + </button>
                    )
                }

            </div>
            <div>
                {
                    !loading && player.host && (
                        <button> - </button>
                    )
                }
                {
                    !loading && gamesettings.ANSWER_TIMER && (
                        <label> {gamesettings.ANSWER_TIMER} </label>
                    )
                }
                {
                    !loading && player.host && (
                        <button> + </button>
                    )
                }

            </div>
            <div>
                {
                    !loading && player.host && (
                        <button>
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
