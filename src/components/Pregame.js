import React from 'react'
import Players from './Players';

export default function Pregame({ player, players, gamesettings, updategamesettings }) {

    function updateGameSetting(key, value) {
        const newObject = {
            ...gamesettings,
            [key]: value
        }
        updategamesettings(newObject)
    }
    return (
        <div>
            hello
            {player.host ? (
                <div>
                    {gamesettings.ANSWER_TIMER}

                </div>
            )
                :
                (
                    <div> not hosting </div>
                )
            }
            <Players />
        </div>
    )
}
