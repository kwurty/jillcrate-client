import React from 'react'

export default function Players(props) {
    return (
        <div className="bg-gray-800 rounded-lg px-6 py-6 max-w-md">
            <h1 className="text-white text-3xl"> PLAYERS</h1>
            {props && props.players && props.players.length > 0 ?
                (
                    <div className="b">
                        {props.players.map(player => {
                            return <h3 key={player.id} className="text-white text-blue-400 font-bold py-5 w-full"> {player.name} </h3>
                        })}
                    </div>
                ) : (
                    ""
                )}

        </div>
    )
}
