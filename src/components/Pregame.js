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
                    <div>
                        <h1 className="text-white text-4xl"> {player.roomcode} </h1>
                    </div>
                    <form>
                        Max Players:
                        <select value={gamesettings.MAX_PLAYERS} onChange={(e) => {
                            updateGameSetting('MAX_PLAYERS', parseInt(e.target.value));
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
                        <select value={gamesettings.GAME_MODE} onChange={(e) => {
                            updateGameSetting('GAME_MODE', e.target.value);
                        }}>

                            <option value="lives"> Limited Lives </option>
                            <option value="unlimited"> Unlimited Play </option>
                        </select>

                        {
                            gamesettings.GAME_MODE === "lives" &&
                            (
                                <div>
                                    Number of lives:
                                    <input type="number" min="1" max="8" value={gamesettings.MAX_LIVES} onChange={(e) => {
                                        updateGameSetting('MAX_LIVES', parseInt(e.target.value));
                                    }}>
                                    </input>
                                </div>
                            )
                        }

                        <div>
                            Time to Answer:
                            <input type="number" min="5" max="60" value={gamesettings.ANSWER_TIMER} onChange={(e) => {
                                updateGameSetting('ANSWER_TIMER', parseInt(e.target.value));
                            }}>
                            </input> seconds
                        </div>
                        <div className="block">
                            Max players - {gamesettings.MAX_PLAYERS}
                        </div>
                        <div className="block">
                            Time to Answer - {gamesettings.ANSWER_TIMER}
                        </div>
                        <div className="block">
                            Game Mode? - {gamesettings.GAME_MODE}
                        </div>

                        <button className="border rounded-lg bg-blue-400 mx-5 px-10 py-5" onClick={(e) => {
                            e.preventDefault();
                        }}> Start </button>

                    </form>

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
