import React, { useState, useEffect } from 'react'
import Players from './Players';

export default function Pregame({ player, players, gamesettings, updategamesettings }) {

    let [loading, setLoading] = useState(true)

    function updateGameSetting(key, value) {
        const newObject = {
            ...gamesettings,
            [key]: value
        }
        updategamesettings(newObject)
    }
    useEffect(() => {
        if (gamesettings) setLoading(false);
    }, [gamesettings])
    return (

        <div>
            {
                !loading && gamesettings.MAX_PLAYERS && (
                    <label> {gamesettings.MAX_PLAYERS} </label>
                )
            }
            {
                !loading && gamesettings.GAME_MODE && (
                    <label> {gamesettings.GAME_MODE} </label>
                )
            }
            {
                !loading && gamesettings.MAX_LIVES && (
                    <label> {gamesettings.MAX_LIVES} </label>
                )
            }
            {
                !loading && gamesettings.ANSWER_TIMER && (
                    <label> {gamesettings.ANSWER_TIMER} </label>
                )
            }
            <Players />
        </div>
    )
}
