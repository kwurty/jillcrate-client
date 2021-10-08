import React from 'react'

export default function DisplaySettings(props) {

    return (
        <div>
            {props && props.gameSettings ? (
                <div>
                    <div className="bg-gray-100 rounded-lg w-full h-auto py-4 flex flex-row justify-between divide-x divide-solid divide-gray-400">
                        <div className="relative flex-2 flex flex-col gap-2 px-4">
                            <label className="text-gray-800 text-base font-semibold tracking-wider">Game Mode</label>
                            <label className="text-green-800 text-4xl font-bold">{
                                props.gameSettings.GAME_MODE === "lives" ?
                                    "Lives" : "Endless"
                            }</label>
                        </div>
                        {
                            props.gameSettings.GAME_MODE === "lives" &&
                            <div className="relative flex-2 flex flex-col gap-2 px-4">
                                <label className="text-gray-800 text-base font-semibold tracking-wider">Lives</label>
                                <label className="text-green-800 text-4xl font-bold">{props.gameSettings.MAX_LIVES}</label>
                            </div>
                        }
                        <div className="relative flex-2 flex flex-col gap-2 px-4">
                            <label className="text-gray-800 text-base font-semibold tracking-wider">Max Players</label>
                            <label className="text-green-800 text-4xl font-bold">{props.gameSettings.MAX_PLAYERS}</label>
                        </div>
                        <div className="relative flex-2 flex flex-col gap-2 px-4">
                            <label className="text-gray-800 text-base font-semibold tracking-wider">Max Players</label>
                            <label className="text-green-800 text-4xl font-bold">{props.gameSettings.MAX_PLAYERS}</label>
                        </div>
                    </div>
                    Max Players -

                    {props.gameSettings.ANSWER_TIMER}
                    {props.gameSettings.GAME_MODE}
                    {props.gameSettings.MAX_LIVES}
                </div>
            )
                :
                ''
            }

        </div>
    )
}
