import React from 'react'

export default function Players({ players }) {
    return (
        <div className="bg-gray-800 rounded-lg px-4 max-w-md">
            <div className="">

                <h1 className="text-white text-3xl pt-3"> PLAYERS</h1>
                <div className="flex flex-col py-4">
                    <ol type="1">

                        {players &&
                            players.map(player => {
                                return (
                                    <li key={player.id} className="text-white text-lg">
                                        {player.name}
                                    </li>
                                )
                            })}
                    </ol>
                </div>
            </div>
        </div>
    )
}
