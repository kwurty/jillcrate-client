import React from 'react'

export default function Players({ players }) {
    return (
        <div className="bg-gray-800 rounded-lg px-6 max-w-md h-screen mr-2">
            <div className="">

                <h1 className="text-white text-3xl pt-3"> PLAYERS</h1>
                <div className="flex flex-row py-4">
                    {players &&
                        players.map(player => {
                            return (
                                <div key={player.id} className="text-white text-lg">
                                    {player.name}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
